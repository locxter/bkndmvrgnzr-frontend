<script lang="ts">
    import { page } from '$app/stores';
    import { BookController } from '$lib/book/api/book-controller';
    import BookView from '$lib/book/component/BookView.svelte';
    import type { Book } from '$lib/book/db/book';
    import { Isbn } from '$lib/book/db/isbn';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: bookController = new BookController($globalServerAddress, $globalJwt);
    let book: Book;

    onMount(async () => {
        try {
            book = await bookController.getBook(new Isbn($page.params.isbn));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    {#if book}
        {#if book.subtitle}
            <title>{book.title} - {book.subtitle} | bkndmvrgnzr</title>
        {:else}
            <title>{book.title} | bkndmvrgnzr</title>
        {/if}
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
        {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/book/update/{book.isbn.value}">
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
