<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { BookController } from '$lib/book/api/book-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { BookUpdateDto } from '$lib/book/api/book-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import BookUpdate from '$lib/book/component/BookUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';

    let isbn: string;
    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let book: BookResponseDto;
    let bookUpdate: BookUpdateDto;

    page.subscribe((data) => {
        isbn = data.params.isbn;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
    });

    onMount(() => {
        bookController
            .getBook(isbn)
            .then((data) => {
                book = data;
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
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });

    function updateBook() {
        bookController
            .updateBook(book.isbn, bookUpdate)
            .then((data) => {
                book = data;
                alert('Book successfully updated');
                goto('/book/' + book.isbn);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function deleteBook() {
        bookController
            .deleteBook(book.isbn)
            .then((data) => {
                alert('Book successfully deleted');
                goto('/book');
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
        <BookUpdate bind:bookUpdate />
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
