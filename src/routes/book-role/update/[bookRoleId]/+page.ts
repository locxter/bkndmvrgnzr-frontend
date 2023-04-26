import { page } from '$app/stores';
import { ERole } from '$lib/role/db/erole';
import { globalJwt, globalRoles } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export function load() {
    if (!get(globalJwt) || !get(globalRoles).includes(ERole.ROLE_USER)) {
        throw redirect(307, '/');
    } else if (!get(globalRoles).includes(ERole.ROLE_EDITOR)) {
        throw redirect(307, '/book-role/' + get(page).params.bookRoleId);
    }
}
