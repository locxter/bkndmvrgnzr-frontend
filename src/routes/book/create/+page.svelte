<script lang="ts">
    import { goto } from '$app/navigation';
    import { BookController } from '$lib/book/api/book-controller';
    import BookCreate from '$lib/book/component/BookCreate.svelte';
    import type { Book } from '$lib/book/db/book';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let publishingHouseController: PublishingHouseController;
    let genreController: GenreController;
    let bookContributorController: BookContributorController;
    let book: Book;

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

    async function createBook() {
        try {
            let data = await bookController.createBook(book);
            alert('Book successfully created');
            goto('/book/' + data.isbn.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
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
    <BookCreate bind:book {publishingHouseController} {genreController} {bookContributorController} />
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
