<script lang="ts">
    import type { BookContributorResponseDto } from '$lib/bookcontributor/api/book-contributor-response-dto';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import PublishingHouseViewBrief from '$lib/publishinghouse/component/PublishingHouseViewBrief.svelte';
    import { BookResponseDto } from '../api/book-response-dto';

    export let book: BookResponseDto = new BookResponseDto();

    let genres = book.genres as GenreResponseDto[];
    let bookContributors = book.bookContributors as BookContributorResponseDto[];
</script>

<h2>{book.title}</h2>
{#if book.subtitle}
    <h3>{book.subtitle}</h3>
{/if}
<p>
    ISBN:
    <br />
    {book.isbn}
</p>
<p>
    Description:
    <br />
    {book.description}
</p>
<p>
    Year:
    <br />
    {book.year}
</p>
<p>
    Pages:
    <br />
    {book.pages}
</p>
<p>
    Publishing house:
    <br />
    <PublishingHouseViewBrief publishingHouse={book.publishingHouse} />
</p>
<p>Genres:</p>
<GenreList {genres} />
<p>Contributors:</p>
<BookContributorList {bookContributors} />
