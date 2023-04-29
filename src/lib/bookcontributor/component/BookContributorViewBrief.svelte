<script lang="ts">
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import type { BookContributorBrief } from '../db/book-contributor-brief';

    export let bookContributor: BookContributorBrief;

    $: bookRole = bookContributor.bookRole;
    $: contributor = bookContributor.contributor;
</script>

<BookRoleViewBrief {bookRole} />
:
<ContributorViewBrief {contributor} />
