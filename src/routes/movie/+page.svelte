<script lang="ts">
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieLibraryMovieSelect from '$lib/movie/component/MovieLibraryMovieSelect.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
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
    globalRoles.subscribe((data) => {
        roles = data;
    });

    onMount(async () => {
        try {
            movies = await movieController.getAllMovies();
            libraryMoviesOld = await movieController.getAllMoviesOfUser();
            libraryMovies = [...libraryMoviesOld];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateLibrary() {
        try {
            // Remove unselected library movies
            for (let libraryMovieOld of libraryMoviesOld) {
                if (!libraryMovies.map((it) => it.isan.value).includes(libraryMovieOld.isan.value)) {
                    await movieController.removeMovieFromUser(libraryMovieOld.isan);
                }
            }
            // Add new library movies
            for (let libraryMovie of libraryMovies) {
                if (!libraryMoviesOld.map((it) => it.isan.value).includes(libraryMovie.isan.value)) {
                    await movieController.addMovieToUser(libraryMovie.isan);
                }
            }
            movies = await movieController.getAllMovies();
            libraryMoviesOld = [...libraryMovies];
            alert('Library successfully updated');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Movie</h2>
    <MovieLibraryMovieSelect bind:movies bind:libraryMovies {movieController} />
    <p>
        <button on:click={updateLibrary}>Update library</button>
    </p>
    {#if roles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/movie/create">
                <button>Create movie</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
