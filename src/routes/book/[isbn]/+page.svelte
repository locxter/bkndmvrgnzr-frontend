<script lang="ts">
    import { page } from '$app/stores';
    import { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookView from '$lib/book/component/BookView.svelte';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let isbn: string;
    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
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
    globalRoles.subscribe((data) => {
        roles = data;
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
        {#if roles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/book/update/{book.isbn}">
                    <button>Update book</button>
                </a>
            </p>
        {/if}
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
