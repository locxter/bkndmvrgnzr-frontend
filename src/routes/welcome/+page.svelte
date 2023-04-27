<script lang="ts">
    import { BookController } from '$lib/book/api/book-controller';
    import type { Book } from '$lib/book/db/book';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import type { Movie } from '$lib/movie/db/movie';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import type { User } from '$lib/user/db/user';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import BookList from '../../lib/book/component/BookList.svelte';
    import MovieList from '../../lib/movie/component/MovieList.svelte';

    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let bookController: BookController;
    let movieController: MovieController;
    let user: User;
    let books: Book[] = [];
    let movies: Movie[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        userController = new UserController(serverAddress, jwt);
        bookController = new BookController(serverAddress, jwt);
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        userController = new UserController(serverAddress, jwt);
        bookController = new BookController(serverAddress, jwt);
        movieController = new MovieController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            user = await userController.getUser();
            books = (await bookController.getAllBooksOfUser()).slice(0, 10);
            movies = (await movieController.getAllMoviesOfUser()).slice(0, 10);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Welcome | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>
        Welcome
        {#if user}
            {#if user.firstName && user.lastName}
                {user.lastName}, {user.firstName}
            {:else}
                {user.username}
            {/if}
        {:else}
            nobody
        {/if}
    </h2>
    <h3>Books</h3>
    <BookList {books} />
    <a href="/book/library">View more</a>
    <h3>Movies</h3>
    <MovieList {movies} />
    <a href="/movie/library">View more</a>
</main>
<Footer />
