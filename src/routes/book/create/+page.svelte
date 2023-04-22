<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { BookController } from '$lib/book/api/book-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { BookCreateDto } from '$lib/book/api/book-create-dto';
    import BookCreate from '$lib/book/component/BookCreate.svelte';
    import { goto } from '$app/navigation';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let bookCreate: BookCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
    });

    function createBook() {
        bookController
            .createBook(bookCreate)
            .then((data) => {
                alert('Book successfully created');
                goto('/book/' + data.isbn);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }
</script>

<svelte:head>
    <title>Create book | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create book</h2>
    <BookCreate bind:bookCreate />
    <p>
        <button on:click={createBook}>Create book</button>
    </p>
    <p>
        <a href="/book">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
