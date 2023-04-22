<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { onMount } from 'svelte/types/runtime/internal/lifecycle';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import MovieView from '$lib/movie/component/MovieView.svelte';

    let isan: string;
    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movie: MovieResponseDto;

    page.subscribe((data) => {
        isan = data.params.isan;
    });

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
            .getMovie(isan)
            .then((data) => {
                movie = data;
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
    {#if movie}
        <MovieView {movie} />
        <p>
            <a href="/edit-movie/{movie.isan}">Edit movie</a>
        </p>
    {:else}
        <h2>Movie not found</h2>
    {/if}
</main>
<Footer />
