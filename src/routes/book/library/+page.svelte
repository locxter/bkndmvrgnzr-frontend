<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import BookList from '$lib/book/component/BookList.svelte';
    import BookLibrarySearch from '$lib/book/component/BookLibrarySearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let books: BookResponseDto[];

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
            .getAllBooksOfUser()
            .then((data) => {
                books = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });
</script>

<svelte:head>
    <title>Book | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Book</h2>
    <BookLibrarySearch {bookController} bind:books />
    <BookList {books} />
</main>
<Footer />
