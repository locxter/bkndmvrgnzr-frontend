<script lang="ts">
    import BookList from '$lib/book/component/BookList.svelte';
    import type { BookBrief } from '$lib/book/db/book-brief';
    import type { PublishingHouse } from '../db/publishing-house';

    export let publishingHouse: PublishingHouse;

    $: books = publishingHouse.books;
</script>

<h2>{publishingHouse.name}</h2>
<p>
    City:
    <br />
    {publishingHouse.city}
</p>
<p>
    Country:
    <br />
    {publishingHouse.country}
</p>
<p>Books:</p>
<BookList {books} />
