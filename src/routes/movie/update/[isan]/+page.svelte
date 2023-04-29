<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieUpdate from '$lib/movie/component/MovieUpdate.svelte';
    import { Isan } from '$lib/movie/db/isan';
    import type { Movie } from '$lib/movie/db/movie';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    $: movieController = new MovieController($globalServerAddress, $globalJwt);
    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    $: movieContributorController = new MovieContributorController($globalServerAddress, $globalJwt);
    let movie: Movie;

    onMount(async () => {
        try {
            movie = await movieController.getMovie(new Isan($page.params.isan));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateMovie() {
        try {
            movie = await movieController.updateMovie(movie.isan, movie);
            alert('Movie successfully updated');
            goto('/movie/' + movie.isan.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteMovie() {
        try {
            await movieController.deleteMovie(movie.isan);
            alert('Movie successfully deleted');
            goto('/movie');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if movie}
        <h2>Update movie</h2>
        <MovieUpdate bind:movie {genreController} {movieContributorController} />
        <p>
            <button on:click={updateMovie}>Update movie</button>
        </p>
        <p>
            <button on:click={deleteMovie}>Delete movie</button>
        </p>
        <p>
            <a href="/movie/{movie.isan.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie not found</h2>
    {/if}
</main>
<Footer />
