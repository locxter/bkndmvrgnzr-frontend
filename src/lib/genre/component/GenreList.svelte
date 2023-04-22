<script lang="ts">
    import type { GenreResponseDto } from '../api/genre-response-dto';
    import GenreViewBrief from './GenreViewBrief.svelte';

    export let genres: GenreResponseDto[] = [];
</script>

<ul>
    {#each genres as genre}
        <li><GenreViewBrief {genre} /></li>
    {:else}
        <li>No genres</li>
    {/each}
</ul>
