<script lang="ts">
    import { goto } from '$app/navigation';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieCreate from '$lib/movie/component/MovieCreate.svelte';
    import { Movie } from '$lib/movie/db/movie';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { MovieImportController } from '$lib/movieimport/api/movie-import-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: movieController = new MovieController($globalServerAddress, $globalJwt);
    $: movieImportController = new MovieImportController($globalServerAddress, $globalJwt);
    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    $: movieContributorController = new MovieContributorController($globalServerAddress, $globalJwt);
    let movie = new Movie();

    async function createMovie() {
        try {
            let data = await movieController.createMovie(movie);
            alert('Movie successfully created');
            goto('/movie/' + data.isan.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create movie</h2>
    <MovieCreate bind:movie {movieImportController} {genreController} {movieContributorController} />
    <p>
        <button on:click={createMovie}>Create movie</button>
    </p>
    <p>
        <a href="/movie">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
