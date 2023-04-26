<script lang="ts">
    import { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookLibrarySearch from '$lib/book/component/BookLibrarySearch.svelte';
    import BookList from '$lib/book/component/BookList.svelte';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let books: BookResponseDto[] = [];
    let updateBooks: BookResponseDto[] = [];

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
            updateBooks = await bookController.getAllBooksOfUser();
            books = [...updateBooks];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleBook(book: BookResponseDto) {
        if (updateBooks.map((it) => it.isbn).includes(book.isbn)) {
            updateBooks.splice(updateBooks.map((it) => it.isbn).indexOf(book.isbn), 1);
            updateBooks = updateBooks;
        } else {
            updateBooks = [...updateBooks, book];
        }
    }

    async function update() {
        try {
            // Remove unselected books
            for (let book of books) {
                if (!updateBooks.map((it) => it.isbn).includes(book.isbn)) {
                    await bookController.removeBookFromUser(book.isbn);
                }
            }
            books = [...updateBooks];
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
    <BookLibrarySearch {bookController} bind:books />
    <BookList {books} let:book>
        <button on:click={() => toggleBook(book)}>
            {#if updateBooks.map((it) => it.isbn).includes(book.isbn)}
                Deselect
            {:else}
                Select
            {/if}
        </button>
    </BookList>
    <p>{updateBooks.length} books in library</p>
    <p>
        <button on:click={update}>Update library</button>
    </p>
</main>
<Footer />
