<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { MovieRoleUpdateDto } from '$lib/movierole/api/movie-role-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import MovieRoleUpdate from '$lib/movierole/component/MovieRoleUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';

    let movieRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let movieRoleController: MovieRoleController;
    let movieRole: MovieRoleResponseDto;
    let movieRoleUpdate: MovieRoleUpdateDto;

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
            movieRoleUpdate = movieRole as MovieRoleUpdateDto;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateMovieRole() {
        try {
            movieRole = await movieRoleController.updateMovieRole(movieRole.id, movieRoleUpdate);
            alert('Movie role successfully updated');
            goto('/movie-role/' + movieRole.id);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteMovieRole() {
        try {
            await movieRoleController.deleteMovieRole(movieRole.id);
            alert('Movie role successfully deleted');
            goto('/movie-role');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update movie role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if movieRole}
        <h2>Update movie role</h2>
        <MovieRoleUpdate bind:movieRoleUpdate />
        <p>
            <button on:click={updateMovieRole}>Update movie role</button>
        </p>
        <p>
            <button on:click={deleteMovieRole}>Delete movie role</button>
        </p>
        <p>
            <a href="/movie-role/{movieRole.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie role not found</h2>
    {/if}
</main>
<Footer />
