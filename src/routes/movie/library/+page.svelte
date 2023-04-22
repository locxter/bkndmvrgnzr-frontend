<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import MovieLibrarySearch from '$lib/movie/component/MovieLibrarySearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movies: MovieResponseDto[];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieController = new MovieController(serverAddress, jwt);
    });

    onMount(() => {
        movieController
            .getAllMoviesOfUser()
            .then((data) => {
                movies = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });
</script>

<svelte:head>
    <title>Movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Movie</h2>
    <MovieLibrarySearch {movieController} bind:movies />
    <MovieList {movies} />
</main>
<Footer />
