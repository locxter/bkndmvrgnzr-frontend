<script lang="ts">
    import BookList from '../../lib/book/component/BookList.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import MovieList from '../../lib/movie/component/MovieList.svelte';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { BookController } from '$lib/book/api/book-controller';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { onMount } from 'svelte';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import type { UserResponseDto } from '$lib/user/api/user-response-dto';
    import { UserController } from '$lib/user/api/user-controller';

    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let bookController: BookController;
    let movieController: MovieController;
    let user: UserResponseDto;
    let books: BookResponseDto[] = [];
    let movies: MovieResponseDto[] = [];

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

    onMount(() => {
        userController
            .getUser()
            .then((data) => {
                user = data;
            })
            .catch((error) => {
                console.error(error);
            });
        bookController
            .getAllBooks()
            .then((data) => {
                books = data;
            })
            .catch((error) => {
                console.error(error);
            });
        movieController
            .getAllMovies()
            .then((data) => {
                movies = data;
            })
            .catch((error) => {
                console.error(error);
            });
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
    <a href="/book">View more</a>
    <h3>Movies</h3>
    <MovieList {movies} />
    <a href="/movie">View more</a>
</main>
<Footer />
