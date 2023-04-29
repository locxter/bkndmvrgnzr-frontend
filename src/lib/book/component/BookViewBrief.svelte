<script lang="ts">
    import type { BookBrief } from '../db/book-brief';

    export let book: BookBrief;
</script>

<a href="/book/{book.isbn.value}">
    {book.title}
    {#if book.subtitle}
        - {book.subtitle}
    {/if}
    {#if book.year}
        ({book.year})
    {/if}
</a>
