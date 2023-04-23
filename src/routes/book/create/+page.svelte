<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { BookController } from '$lib/book/api/book-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { BookCreateDto } from '$lib/book/api/book-create-dto';
    import BookCreate from '$lib/book/component/BookCreate.svelte';
    import { goto } from '$app/navigation';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let publishingHouseController: PublishingHouseController;
    let genreController: GenreController;
    let bookContributorController: BookContributorController;
    let bookCreate: BookCreateDto;

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
            let data = await bookController.createBook(bookCreate);
            alert('Book successfully created');
            goto('/book/' + data.isbn);
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
    <BookCreate bind:bookCreate {publishingHouseController} {genreController} {bookContributorController} />
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
