<script lang="ts">
    import { BookResponseDto } from '../api/book-response-dto';

    export let book: BookResponseDto = new BookResponseDto();
</script>

<a href="/book/{book.isbn}">
    {book.title}
    {#if book.subtitle}
        - {book.subtitle}
    {/if}
    {#if book.year}
        ({book.year})
    {/if}
</a>
