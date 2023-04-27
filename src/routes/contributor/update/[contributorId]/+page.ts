import { page } from '$app/stores';
import { AccessRestriction } from '$lib/access-restriction';
import { get } from 'svelte/store';

export function load() {
    AccessRestriction.restrictToEditor('/contributor/' + get(page).params.contributorId);
}
