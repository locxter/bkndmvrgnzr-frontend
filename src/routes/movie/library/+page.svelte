<script lang="ts">
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieLibraryLibraryMovieSelect from '$lib/movie/component/MovieLibraryLibraryMovieSelect.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movies: Movie[] = [];
    let libraryMoviesOld: Movie[] = [];
    let libraryMovies: Movie[] = [];

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
            movies = await movieController.getAllMoviesOfUser();
            libraryMoviesOld = [...movies];
            libraryMovies = [...movies];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function update() {
        try {
            // Remove unselected library movies
            for (let libraryMovieOld of libraryMoviesOld) {
                if (!libraryMovies.map((it) => it.isan.value).includes(libraryMovieOld.isan.value)) {
                    await movieController.removeMovieFromUser(libraryMovieOld.isan);
                }
            }
            movies = await movieController.getAllMoviesOfUser();
            libraryMoviesOld = [...libraryMovies];
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
    <MovieLibraryLibraryMovieSelect bind:movies bind:libraryMovies {movieController} />
    <p>
        <button on:click={update}>Update library</button>
    </p>
</main>
<Footer />
