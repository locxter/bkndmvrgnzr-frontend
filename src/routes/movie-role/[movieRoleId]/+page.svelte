<script lang="ts">
    import { page } from '$app/stores';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleView from '$lib/movierole/component/MovieRoleView.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { MovieRoleId } from '$lib/movierole/db/movie-role-id';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

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
        {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/movie-role/update/{movieRole.id.value}">
                    <button>Update movie role</button>
                </a>
            </p>
        {/if}

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
