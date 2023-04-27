import { redirect } from '@sveltejs/kit';
import { ERole } from './role/db/erole';
import { globalJwt, globalRoles } from './stores';

export class AccessRestriction {
    static jwt: string;
    static roles: ERole[] = [];

    static {
        globalJwt.subscribe((data) => {
            this.jwt = data;
        });
        globalRoles.subscribe((data) => {
            this.roles = data;
        });
    }

    static restrictToUser() {
        if (!this.jwt || !this.roles.includes(ERole.ROLE_USER)) {
            throw redirect(307, '/');
        }
    }

    static restrictToEditor(redirectUrl: string = '/') {
        if (!this.jwt || !this.roles.includes(ERole.ROLE_USER)) {
            throw redirect(307, '/');
        } else if (!this.roles.includes(ERole.ROLE_EDITOR)) {
            throw redirect(307, redirectUrl);
        }
    }

    static restrictToAdmin(redirectUrl: string = '/') {
        if (!this.jwt || !this.roles.includes(ERole.ROLE_USER)) {
            throw redirect(307, '/');
        } else if (!this.roles.includes(ERole.ROLE_ADMIN)) {
            throw redirect(307, redirectUrl);
        }
    }
}
