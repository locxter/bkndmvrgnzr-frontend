<script lang="ts">
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import MovieRoleSearch from '$lib/movierole/component/MovieRoleSearch.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: movieRoleController = new MovieRoleController($globalServerAddress, $globalJwt);
    let movieRoles: MovieRole[] = [];

    onMount(async () => {
        try {
            movieRoles = await movieRoleController.getAllMovieRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Movie role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Movie role</h2>
    <MovieRoleSearch {movieRoleController} bind:movieRoles />
    <MovieRoleList {movieRoles} />
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/movie-role/create">
                <button>Create movie role</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
