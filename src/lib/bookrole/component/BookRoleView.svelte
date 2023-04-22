<script lang="ts">
    import type { BookContributorResponseDto } from '$lib/bookcontributor/api/book-contributor-response-dto';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import { BookRoleResponseDto } from '../api/book-role-response-dto';

    export let bookRole: BookRoleResponseDto = new BookRoleResponseDto();

    let bookContributors = bookRole.bookContributors as BookContributorResponseDto[];
</script>

<h2>{bookRole.name}</h2>
<p>Contributors:</p>
<BookContributorList {bookContributors} />
