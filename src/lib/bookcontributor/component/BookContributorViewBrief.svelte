<script lang="ts">
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import type { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import { BookContributorBrief } from '../db/book-contributor-brief';

    export let bookContributor: BookContributorBrief = new BookContributorBrief();

    let bookRole: BookRoleBrief;
    let contributor: ContributorBrief;

    $: bookRole = bookContributor.bookRole;
    $: contributor = bookContributor.contributor;
</script>

<BookRoleViewBrief {bookRole} />
:
<ContributorViewBrief {contributor} />
