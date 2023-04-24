<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import MovieSearch from '$lib/movie/component/MovieSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movies: MovieResponseDto[] = [];
    let libraryMovies: MovieResponseDto[] = [];
    let libraryUpdateMovies: MovieResponseDto[] = [];

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
            movies = await movieController.getAllMovies();
            libraryUpdateMovies = await movieController.getAllMoviesOfUser();
            libraryMovies = [...libraryUpdateMovies];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleLibraryMovie(libraryMovie: MovieResponseDto) {
        if (libraryUpdateMovies.map((it) => it.isan).includes(libraryMovie.isan)) {
            libraryUpdateMovies.splice(libraryUpdateMovies.map((it) => it.isan).indexOf(libraryMovie.isan), 1);
            libraryUpdateMovies = libraryUpdateMovies;
        } else {
            libraryUpdateMovies = [...libraryUpdateMovies, libraryMovie];
        }
    }

    async function updateLibrary() {
        try {
            // Remove unselected library movies
            for (let libraryMovie of libraryMovies) {
                if (!libraryUpdateMovies.map((it) => it.isan).includes(libraryMovie.isan)) {
                    await movieController.removeMovieFromUser(libraryMovie.isan);
                }
            }
            // Add new library movies
            for (let libraryUpdateMovie of libraryUpdateMovies) {
                if (!libraryMovies.map((it) => it.isan).includes(libraryUpdateMovie.isan)) {
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
            {#if libraryUpdateMovies.map((it) => it.isan).includes(movie.isan)}
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
    <p>
        <a href="/movie/create">
            <button>Create movie</button>
        </a>
    </p>
</main>
<Footer />
