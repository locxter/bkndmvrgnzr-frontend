<script lang="ts">
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieLibrarySearch from '$lib/movie/component/MovieLibrarySearch.svelte';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import type { MovieBrief } from '$lib/movie/db/movie-brief';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movies: Movie[] = [];
    let updateMovies: Movie[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieController = new MovieController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            updateMovies = await movieController.getAllMoviesOfUser();
            movies = [...updateMovies];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleMovie(movie: MovieBrief) {
        if (updateMovies.map((it) => it.isan.value).includes(movie.isan.value)) {
            updateMovies.splice(updateMovies.map((it) => it.isan.value).indexOf(movie.isan.value), 1);
            updateMovies = updateMovies;
        } else {
            updateMovies = [...updateMovies, movie as Movie];
        }
    }

    async function update() {
        try {
            // Remove unselected movies
            for (let movie of movies) {
                if (!updateMovies.map((it) => it.isan.value).includes(movie.isan.value)) {
                    await movieController.removeMovieFromUser(movie.isan);
                }
            }
            movies = [...updateMovies];
            alert('Library successfully updated');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Movie library | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Movie library</h2>
    <MovieLibrarySearch {movieController} bind:movies />
    <MovieList {movies} let:movie>
        <button on:click={() => toggleMovie(movie)}>
            {#if updateMovies.map((it) => it.isan.value).includes(movie.isan.value)}
                Deselect
            {:else}
                Select
            {/if}
        </button>
    </MovieList>
    <p>{updateMovies.length} movies in library</p>
    <p>
        <button on:click={update}>Update library</button>
    </p>
</main>
<Footer />
