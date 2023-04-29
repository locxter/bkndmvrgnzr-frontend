<script lang="ts">
    import { BookController } from '$lib/book/api/book-controller';
    import BookLibraryBookSelect from '$lib/book/component/BookLibraryBookSelect.svelte';
    import type { Book } from '$lib/book/db/book';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: bookController = new BookController($globalServerAddress, $globalJwt);
    let books: Book[] = [];
    let libraryBooksOld: Book[] = [];
    let libraryBooks: Book[] = [];

    onMount(async () => {
        try {
            books = await bookController.getAllBooks();
            libraryBooksOld = await bookController.getAllBooksOfUser();
            libraryBooks = [...libraryBooksOld];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateLibrary() {
        try {
            // Remove unselected library books
            for (let libraryBookOld of libraryBooksOld) {
                if (!libraryBooks.map((it) => it.isbn.value).includes(libraryBookOld.isbn.value)) {
                    await bookController.removeBookFromUser(libraryBookOld.isbn);
                }
            }
            // Add new library books
            for (let libraryBook of libraryBooks) {
                if (!libraryBooksOld.map((it) => it.isbn.value).includes(libraryBook.isbn.value)) {
                    await bookController.addBookToUser(libraryBook.isbn);
                }
            }
            books = await bookController.getAllBooks();
            libraryBooksOld = [...libraryBooks];
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
    <BookLibraryBookSelect bind:books bind:libraryBooks {bookController} />
    <p>
        <button on:click={updateLibrary}>Update library</button>
    </p>
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/book/create">
                <button>Create book</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
