import type { UserId } from '$lib/user/db/user-id';
import { Role } from '../db/role';
import type { RoleId } from '../db/role-id';
import type { RoleResponseDto } from './role-response-dto';

export class RoleController {
    readonly MAPPING = '/api/role';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllRoles(): Promise<Role[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getRole(roleId: RoleId): Promise<Role> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + roleId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Role.fromDto(JSON.parse(responseText) as RoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllRolesOfSearchQuery(query: string): Promise<Role[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllRolesOfUser(): Promise<Role[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllRolesOfSpecificUser(userId: UserId): Promise<Role[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + userId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async addRoleToSpecificUser(userId: UserId, roleId: RoleId): Promise<Role[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/' + userId.value + '/role/' + roleId.value,
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async removeRoleFromSpecificUser(userId: UserId, roleId: RoleId): Promise<Role[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/' + userId.value + '/role/' + roleId.value,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as RoleResponseDto[]).map((it) => Role.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
