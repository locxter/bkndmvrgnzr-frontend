<script lang="ts">
    import BookList from '../../components/BookList.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import MovieList from '../../components/MovieList.svelte';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { BookController } from '$lib/book/api/book-controller';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { onMount } from 'svelte';
    import { globalJwt, globalServerAddress } from '$lib/stores';

    let serverAddress: string;
    let jwt: string;
    let bookController: BookController;
    let movieController: MovieController;
    let books: BookResponseDto[] = [];
    let movies: MovieResponseDto[] = [];
    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookController = new BookController(serverAddress, jwt);
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookController = new BookController(serverAddress, jwt);
        movieController = new MovieController(serverAddress, jwt);
    });

    onMount(() => {
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
    <h2>Welcome nobody</h2>
    <h3>Books</h3>
    <BookList {books} />
    <a href="">View more</a>
    <h3>Movies</h3>
    <MovieList {movies} />
    <a href="">View more</a>
</main>
<Footer />
