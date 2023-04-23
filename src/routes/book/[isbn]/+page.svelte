<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import { BookController } from '$lib/book/api/book-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';
    import BookView from '$lib/book/component/BookView.svelte';

    let isbn: string;
    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let book: BookResponseDto;

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

    onMount(async () => {
        try {
            book = await bookController.getBook(isbn);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    {#if book}
        <title>{book.title} | bkndmvrgnzr</title>
    {:else}
        <title>Book not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if book}
        <BookView {book} />
        <p>
            <a href="/book/update/{book.isbn}">
                <button>Update book</button>
            </a>
        </p>
        <p>
            <a href="/book">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book not found</h2>
    {/if}
</main>
<Footer />
