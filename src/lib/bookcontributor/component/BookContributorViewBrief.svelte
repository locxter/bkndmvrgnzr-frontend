<script lang="ts">
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import { BookContributorResponseDto } from '../api/book-contributor-response-dto';

    export let bookContributor: BookContributorResponseDto = new BookContributorResponseDto();

    $: bookRole = bookContributor.bookRole as BookRoleResponseDto;
    $: contributor = bookContributor.contributor as ContributorResponseDto;
</script>

<BookRoleViewBrief {bookRole} />
:
<ContributorViewBrief {contributor} />
