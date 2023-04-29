<script lang="ts">
    import { page } from '$app/stores';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import MovieView from '$lib/movie/component/MovieView.svelte';
    import { Isan } from '$lib/movie/db/isan';
    import type { Movie } from '$lib/movie/db/movie';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: movieController = new MovieController($globalServerAddress, $globalJwt);
    let movie: Movie;

    onMount(async () => {
        try {
            movie = await movieController.getMovie(new Isan($page.params.isan));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    {#if movie}
        <title>{movie.title} | bkndmvrgnzr</title>
    {:else}
        <title>Movie not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if movie}
        <MovieView {movie} />
        <p>
            <a href="/movie/update/{movie.isan.value}">
                <button>Update movie</button>
            </a>
        </p>
        <p>
            <a href="/movie">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie not found</h2>
    {/if}
</main>
<Footer />
