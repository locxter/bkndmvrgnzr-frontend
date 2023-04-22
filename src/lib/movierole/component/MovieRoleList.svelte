<script lang="ts">
    import type { MovieRoleResponseDto } from '../api/movie-role-response-dto';
    import MovieRoleViewBrief from './MovieRoleViewBrief.svelte';

    export let movieRoles: MovieRoleResponseDto[] = [];
</script>

<ul>
    {#each movieRoles as movieRole}
        <li><MovieRoleViewBrief {movieRole} /></li>
    {:else}
        <li>No movie roles</li>
    {/each}
</ul>
