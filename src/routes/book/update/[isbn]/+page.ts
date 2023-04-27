import { page } from '$app/stores';
import { AccessRestriction } from '$lib/access-restriction';
import { get } from 'svelte/store';

export function load() {
    AccessRestriction.restrictToEditor('/book/' + get(page).params.isbn);
}
