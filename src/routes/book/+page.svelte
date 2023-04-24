<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import BookList from '$lib/book/component/BookList.svelte';
    import BookSearch from '$lib/book/component/BookSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let books: BookResponseDto[];
    let libraryBooks: BookResponseDto[] = [];
    let libraryUpdateBooks: BookResponseDto[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            books = await bookController.getAllBooks();
            libraryUpdateBooks = await bookController.getAllBooksOfUser();
            libraryBooks = [...libraryUpdateBooks];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleLibraryBook(libraryBook: BookResponseDto) {
        if (libraryUpdateBooks.map((it) => it.isbn).includes(libraryBook.isbn)) {
            libraryUpdateBooks.splice(libraryUpdateBooks.map((it) => it.isbn).indexOf(libraryBook.isbn), 1);
            libraryUpdateBooks = libraryUpdateBooks;
        } else {
            libraryUpdateBooks = [...libraryUpdateBooks, libraryBook];
        }
    }

    async function updateLibrary() {
        try {
            // Remove unselected library books
            for (let libraryBook of libraryBooks) {
                if (!libraryUpdateBooks.map((it) => it.isbn).includes(libraryBook.isbn)) {
                    await bookController.removeBookFromUser(libraryBook.isbn);
                }
            }
            // Add new library books
            for (let libraryUpdateBook of libraryUpdateBooks) {
                if (!libraryBooks.map((it) => it.isbn).includes(libraryUpdateBook.isbn)) {
                    await bookController.addBookToUser(libraryUpdateBook.isbn);
                }
            }
            alert('Library successfully updated');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Book | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Book</h2>
    <BookSearch {bookController} bind:books />
    <BookList {books} let:book>
        <button on:click={() => toggleLibraryBook(book)}>
            {#if libraryUpdateBooks.map((it) => it.isbn).includes(book.isbn)}
                Deselect
            {:else}
                Select
            {/if}
        </button>
    </BookList>
    <p>{libraryUpdateBooks.length} books in library</p>
    <p>
        <button on:click={updateLibrary}>Update library</button>
    </p>
    <p>
        <a href="/book/create">
            <button>Create book</button>
        </a>
    </p>
</main>
<Footer />
