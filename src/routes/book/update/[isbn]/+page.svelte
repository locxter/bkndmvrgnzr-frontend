<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { BookController } from '$lib/book/api/book-controller';
    import BookUpdate from '$lib/book/component/BookUpdate.svelte';
    import type { Book } from '$lib/book/db/book';
    import { Isbn } from '$lib/book/db/isbn';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    $: bookController = new BookController($globalServerAddress, $globalJwt);
    $: publishingHouseController = new PublishingHouseController($globalServerAddress, $globalJwt);
    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    $: bookContributorController = new BookContributorController($globalServerAddress, $globalJwt);
    let book: Book;

    onMount(async () => {
        try {
            book = await bookController.getBook(new Isbn($page.params.isbn));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateBook() {
        try {
            book = await bookController.updateBook(book.isbn, book);
            alert('Book successfully updated');
            goto('/book/' + book.isbn.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteBook() {
        try {
            await bookController.deleteBook(book.isbn);
            alert('Book successfully deleted');
            goto('/book');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update book | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if book}
        <h2>Update book</h2>
        <BookUpdate bind:book {publishingHouseController} {genreController} {bookContributorController} />
        <p>
            <button on:click={updateBook}>Update book</button>
        </p>
        <p>
            <button on:click={deleteBook}>Delete book</button>
        </p>
        <p>
            <a href="/book/{book.isbn.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book not found</h2>
    {/if}
</main>
<Footer />
