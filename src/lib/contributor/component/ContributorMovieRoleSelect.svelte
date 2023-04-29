<script lang="ts">
    import type { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import MovieRoleSearch from '$lib/movierole/component/MovieRoleSearch.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import type { MovieRoleBrief } from '$lib/movierole/db/movie-role-brief';
    import { onMount } from 'svelte';

    export let contributorMovieRoles: MovieRole[];
    export let movieRoleController: MovieRoleController;

    let movieRoles: MovieRole[] = [];

    onMount(async () => {
        try {
            movieRoles = await movieRoleController.getAllMovieRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleMovieRole(movieRole: MovieRoleBrief) {
        if (contributorMovieRoles.map((it) => it.id.value).includes(movieRole.id.value)) {
            contributorMovieRoles.splice(contributorMovieRoles.map((it) => it.id.value).indexOf(movieRole.id.value), 1);
            contributorMovieRoles = contributorMovieRoles;
        } else {
            contributorMovieRoles = [...contributorMovieRoles, movieRole as MovieRole];
        }
    }
</script>

<MovieRoleSearch bind:movieRoles {movieRoleController} />
<MovieRoleList {movieRoles} let:movieRole>
    <button on:click={() => toggleMovieRole(movieRole)}>
        {#if contributorMovieRoles.map((it) => it.id.value).includes(movieRole.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieRoleList>
<p>
    {contributorMovieRoles.length}
    {#if contributorMovieRoles.length === 1}
        movie role
    {:else}
        movie roles
    {/if}
    selected
</p>
