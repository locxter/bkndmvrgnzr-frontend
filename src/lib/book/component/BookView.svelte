<script lang="ts">
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import type { BookContributorBrief } from '$lib/bookcontributor/db/book-contributor-brief';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import PublishingHouseViewBrief from '$lib/publishinghouse/component/PublishingHouseViewBrief.svelte';
    import type { PublishingHouseBrief } from '$lib/publishinghouse/db/publishing-house-brief';
    import { Book } from '../db/book';

    export let book: Book = new Book();

    let publishingHouse: PublishingHouseBrief;
    let genres: GenreBrief[] = [];
    let bookContributors: BookContributorBrief[] = [];

    $: publishingHouse = book.publishingHouse;
    $: genres = book.genres;
    $: bookContributors = book.bookContributors;
</script>

<h2>{book.title}</h2>
{#if book.subtitle}
    <h3>{book.subtitle}</h3>
{/if}
<p>
    ISBN:
    <br />
    {book.isbn.value}
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
    <PublishingHouseViewBrief {publishingHouse} />
</p>
<p>Genres:</p>
<GenreList {genres} />
<p>Contributors:</p>
<BookContributorList {bookContributors} />
