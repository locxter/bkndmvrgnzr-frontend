<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import { BookUpdateDto } from '$lib/book/api/book-update-dto';
    import BookUpdate from '$lib/book/component/BookUpdate.svelte';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let isbn: string;
    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let publishingHouseController: PublishingHouseController;
    let genreController: GenreController;
    let bookContributorController: BookContributorController;
    let book: BookResponseDto;
    let bookUpdate: BookUpdateDto;

    page.subscribe((data) => {
        isbn = data.params.isbn;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
        publishingHouseController = new PublishingHouseController(serverAddress, jwt);
        genreController = new GenreController(serverAddress, jwt);
        bookContributorController = new BookContributorController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
        publishingHouseController = new PublishingHouseController(serverAddress, jwt);
        genreController = new GenreController(serverAddress, jwt);
        bookContributorController = new BookContributorController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            book = await bookController.getBook(isbn);
            bookUpdate = new BookUpdateDto(
                book.title,
                book.subtitle,
                book.description,
                book.year,
                book.pages,
                book.publishingHouse.id,
                book.genres.map((it) => it.id),
                book.bookContributors.map((it) => it.id)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateBook() {
        try {
            book = await bookController.updateBook(book.isbn, bookUpdate);
            alert('Book successfully updated');
            goto('/book/' + book.isbn);
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
        <BookUpdate bind:bookUpdate {publishingHouseController} {genreController} {bookContributorController} />
        <p>
            <button on:click={updateBook}>Update book</button>
        </p>
        <p>
            <button on:click={deleteBook}>Delete book</button>
        </p>
        <p>
            <a href="/book/{book.isbn}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book not found</h2>
    {/if}
</main>
<Footer />
