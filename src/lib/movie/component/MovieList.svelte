<script lang="ts">
    import type { MovieResponseDto } from '../api/movie-response-dto';
    import MovieViewBrief from './MovieViewBrief.svelte';

    export let movies: MovieResponseDto[] = [];
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
