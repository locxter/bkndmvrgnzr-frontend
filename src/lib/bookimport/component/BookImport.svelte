<script lang="ts">
    import type { Book } from '$lib/book/db/book';
    import type { BookImportController } from '../api/book-import-controller';
    import type { BookImportResponseDto } from '../api/book-import-response-dto';

    export let book: Book;
    export let bookImportResponse: BookImportResponseDto;
    export let bookImportController: BookImportController;

    async function importBook() {
        try {
            bookImportResponse = await bookImportController.importBook(book.isbn);
            book.title = bookImportResponse.title ? bookImportResponse.title : book.title;
            book.subtitle = bookImportResponse.subtitle ? bookImportResponse.subtitle : book.subtitle;
            book.year = bookImportResponse.year ? bookImportResponse.year : book.year;
            book.pages = bookImportResponse.pages ? bookImportResponse.pages : book.pages;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<p>
    <button on:click={importBook}>Import book</button>
</p>
