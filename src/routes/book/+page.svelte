<script lang="ts">
    import { BookController } from '$lib/book/api/book-controller';
    import BookList from '$lib/book/component/BookList.svelte';
    import BookSearch from '$lib/book/component/BookSearch.svelte';
    import type { Book } from '$lib/book/db/book';
    import type { BookBrief } from '$lib/book/db/book-brief';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
    let bookController: BookController;
    let books: Book[];
    let libraryBooks: Book[] = [];
    let libraryUpdateBooks: Book[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
    });
    globalRoles.subscribe((data) => {
        roles = data;
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

    function toggleLibraryBook(libraryBook: BookBrief) {
        if (libraryUpdateBooks.map((it) => it.isbn.value).includes(libraryBook.isbn.value)) {
            libraryUpdateBooks.splice(libraryUpdateBooks.map((it) => it.isbn.value).indexOf(libraryBook.isbn.value), 1);
            libraryUpdateBooks = libraryUpdateBooks;
        } else {
            libraryUpdateBooks = [...libraryUpdateBooks, libraryBook as Book];
        }
    }

    async function updateLibrary() {
        try {
            // Remove unselected library books
            for (let libraryBook of libraryBooks) {
                if (!libraryUpdateBooks.map((it) => it.isbn.value).includes(libraryBook.isbn.value)) {
                    await bookController.removeBookFromUser(libraryBook.isbn);
                }
            }
            // Add new library books
            for (let libraryUpdateBook of libraryUpdateBooks) {
                if (!libraryBooks.map((it) => it.isbn.value).includes(libraryUpdateBook.isbn.value)) {
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
            {#if libraryUpdateBooks.map((it) => it.isbn.value).includes(book.isbn.value)}
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
    {#if roles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/book/create">
                <button>Create book</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
