<script lang="ts">
    import type { GenreBrief } from '../db/genre-brief';
    import GenreViewBrief from './GenreViewBrief.svelte';

    export let genres: GenreBrief[];
</script>

<ul>
    {#each genres as genre}
        <li>
            <slot {genre} />
            <GenreViewBrief {genre} />
        </li>
    {:else}
        <li>No genres</li>
    {/each}
</ul>
