<script lang="ts">
    import type { MovieRoleBrief } from '../db/movie-role-brief';
    import MovieRoleViewBrief from './MovieRoleViewBrief.svelte';

    export let movieRoles: MovieRoleBrief[] = [];
</script>

<ul>
    {#each movieRoles as movieRole}
        <li>
            <slot {movieRole} />
            <MovieRoleViewBrief {movieRole} />
        </li>
    {:else}
        <li>No movie roles</li>
    {/each}
</ul>
