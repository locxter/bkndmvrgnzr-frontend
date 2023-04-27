<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleUpdate from '$lib/movierole/component/MovieRoleUpdate.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { MovieRoleId } from '$lib/movierole/db/movie-role-id';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let movieRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let movieRoleController: MovieRoleController;
    let movieRole: MovieRole;
    let movieRoleUpdate: MovieRole;

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
            movieRole = await movieRoleController.getMovieRole(new MovieRoleId(movieRoleId));
            movieRoleUpdate = Object.create(movieRole);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateMovieRole() {
        try {
            movieRole = await movieRoleController.updateMovieRole(movieRole.id, movieRoleUpdate);
            alert('Movie role successfully updated');
            goto('/movie-role/' + movieRole.id.value);
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
            <a href="/movie-role/{movieRole.id.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie role not found</h2>
    {/if}
</main>
<Footer />
