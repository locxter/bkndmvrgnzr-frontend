<script lang="ts">
    import type { MovieBrief } from '../db/movie-brief';
    import MovieViewBrief from './MovieViewBrief.svelte';

    export let movies: MovieBrief[];
</script>

<ul>
    {#each movies as movie}
        <li>
            <slot {movie} />
            <MovieViewBrief {movie} />
        </li>
    {:else}
        <li>No movies</li>
    {/each}
</ul>
