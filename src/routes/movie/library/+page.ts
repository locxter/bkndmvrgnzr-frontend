import { get } from 'svelte/store';
import { globalJwt } from '$lib/stores';
import { redirect } from '@sveltejs/kit';

export function load() {
    if (!get(globalJwt)) {
        throw redirect(307, '/');
    }
}
