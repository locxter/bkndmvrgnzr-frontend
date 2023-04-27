<script lang="ts">
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import MovieSearch from '$lib/movie/component/MovieSearch.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import type { MovieBrief } from '$lib/movie/db/movie-brief';
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
    let libraryMovies: Movie[] = [];
    let libraryUpdateMovies: Movie[] = [];

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
            libraryUpdateMovies = await movieController.getAllMoviesOfUser();
            libraryMovies = [...libraryUpdateMovies];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleLibraryMovie(libraryMovie: MovieBrief) {
        if (libraryUpdateMovies.map((it) => it.isan.value).includes(libraryMovie.isan.value)) {
            libraryUpdateMovies.splice(
                libraryUpdateMovies.map((it) => it.isan.value).indexOf(libraryMovie.isan.value),
                1
            );
            libraryUpdateMovies = libraryUpdateMovies;
        } else {
            libraryUpdateMovies = [...libraryUpdateMovies, libraryMovie as Movie];
        }
    }

    async function updateLibrary() {
        try {
            // Remove unselected library movies
            for (let libraryMovie of libraryMovies) {
                if (!libraryUpdateMovies.map((it) => it.isan.value).includes(libraryMovie.isan.value)) {
                    await movieController.removeMovieFromUser(libraryMovie.isan);
                }
            }
            // Add new library movies
            for (let libraryUpdateMovie of libraryUpdateMovies) {
                if (!libraryMovies.map((it) => it.isan.value).includes(libraryUpdateMovie.isan.value)) {
                    await movieController.addMovieToUser(libraryUpdateMovie.isan);
                }
            }
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
    <MovieSearch {movieController} bind:movies />
    <MovieList {movies} let:movie>
        <button on:click={() => toggleLibraryMovie(movie)}>
            {#if libraryUpdateMovies.map((it) => it.isan.value).includes(movie.isan.value)}
                Deselect
            {:else}
                Select
            {/if}
        </button>
    </MovieList>
    <p>{libraryUpdateMovies.length} movies in library</p>
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
