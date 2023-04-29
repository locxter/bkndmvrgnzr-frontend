<script lang="ts">
    import { BookController } from '$lib/book/api/book-controller';
    import BookLibraryLibraryBookSelect from '$lib/book/component/BookLibraryLibraryBookSelect.svelte';
    import type { Book } from '$lib/book/db/book';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: bookController = new BookController($globalServerAddress, $globalJwt);
    let books: Book[] = [];
    let libraryBooksOld: Book[] = [];
    let libraryBooks: Book[] = [];

    onMount(async () => {
        try {
            books = await bookController.getAllBooksOfUser();
            libraryBooksOld = [...books];
            libraryBooks = [...books];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function update() {
        try {
            // Remove unselected library books
            for (let libraryBookOld of libraryBooksOld) {
                if (!libraryBooks.map((it) => it.isbn.value).includes(libraryBookOld.isbn.value)) {
                    await bookController.removeBookFromUser(libraryBookOld.isbn);
                }
            }
            books = await bookController.getAllBooksOfUser();
            libraryBooksOld = [...libraryBooks];
            alert('Library successfully updated');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Book library | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Book library</h2>
    <BookLibraryLibraryBookSelect bind:books bind:libraryBooks {bookController} />
    <p>
        <button on:click={update}>Update library</button>
    </p>
</main>
<Footer />
