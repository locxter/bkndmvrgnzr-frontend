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

    $: movieRoleController = new MovieRoleController($globalServerAddress, $globalJwt);
    let movieRole: MovieRole;

    onMount(async () => {
        try {
            movieRole = await movieRoleController.getMovieRole(new MovieRoleId($page.params.movieRoleId));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateMovieRole() {
        try {
            movieRole = await movieRoleController.updateMovieRole(movieRole.id, movieRole);
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
        <MovieRoleUpdate bind:movieRole />
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
