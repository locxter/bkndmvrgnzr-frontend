import { AccessRestriction } from '$lib/access-restriction';

export function load() {
    AccessRestriction.restrictToEditor('/contributor');
}
