<script lang="ts">
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import PublishingHouseViewBrief from '$lib/publishinghouse/component/PublishingHouseViewBrief.svelte';
    import type { Book } from '../db/book';

    export let book: Book;

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
