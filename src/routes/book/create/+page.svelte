<script lang="ts">
    import { goto } from '$app/navigation';
    import { BookController } from '$lib/book/api/book-controller';
    import BookCreate from '$lib/book/component/BookCreate.svelte';
    import { Book } from '$lib/book/db/book';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { BookImportController } from '$lib/bookimport/api/book-import-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: bookController = new BookController($globalServerAddress, $globalJwt);
    $: bookImportController = new BookImportController($globalServerAddress, $globalJwt);
    $: publishingHouseController = new PublishingHouseController($globalServerAddress, $globalJwt);
    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    $: bookContributorController = new BookContributorController($globalServerAddress, $globalJwt);
    let book = new Book();

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
    <BookCreate
        bind:book
        {bookImportController}
        {publishingHouseController}
        {genreController}
        {bookContributorController}
    />
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
