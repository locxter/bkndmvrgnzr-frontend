<script lang="ts">
    import type { BookController } from '../api/book-controller';
    import type { Book } from '../db/book';
    import type { BookBrief } from '../db/book-brief';
    import BookLibrarySearch from './BookLibrarySearch.svelte';
    import BookList from './BookList.svelte';

    export let books: Book[] = [];
    export let libraryBooks: Book[] = [];
    export let bookController: BookController;

    function toggleLibraryBook(libraryBook: BookBrief) {
        if (libraryBooks.map((it) => it.isbn.value).includes(libraryBook.isbn.value)) {
            libraryBooks.splice(libraryBooks.map((it) => it.isbn.value).indexOf(libraryBook.isbn.value), 1);
            libraryBooks = libraryBooks;
        } else {
            libraryBooks = [...libraryBooks, libraryBook as Book];
        }
    }
</script>

<BookLibrarySearch {bookController} bind:books />
<BookList {books} let:book>
    <button on:click={() => toggleLibraryBook(book)}>
        {#if libraryBooks.map((it) => it.isbn.value).includes(book.isbn.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookList>
<p>{libraryBooks.length} books in library</p>
