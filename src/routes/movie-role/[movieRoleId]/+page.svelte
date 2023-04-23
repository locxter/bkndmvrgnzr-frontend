<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import MovieRoleView from '$lib/movierole/component/MovieRoleView.svelte';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';

    let movieRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let movieRoleController: MovieRoleController;
    let movieRole: MovieRoleResponseDto;

    page.subscribe((data) => {
        movieRoleId = data.params.movieRoleId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieRoleController = new MovieRoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieRoleController = new MovieRoleController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            movieRole = await movieRoleController.getMovieRole(movieRoleId);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    {#if movieRole}
        <title>{movieRole.name} | bkndmvrgnzr</title>
    {:else}
        <title>Movie role not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if movieRole}
        <MovieRoleView {movieRole} />
        <p>
            <a href="/movie-role/update/{movieRole.id}">
                <button>Update movie role</button>
            </a>
        </p>
        <p>
            <a href="/movie-role">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie role not found</h2>
    {/if}
</main>
<Footer />
