<script lang="ts">
    import { BookResponseDto } from '$lib/book/api/book-response-dto';

    export let book: BookResponseDto = new BookResponseDto();
</script>

<a href="/book/{book.isbn}">{book.title} - {book.subtitle} ({book.year})</a>
