<script lang="ts">
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import MovieViewBrief from './MovieViewBrief.svelte';

    export let movies: MovieResponseDto[] = [];
</script>

<ul>
    {#each movies as movie}
        <li><MovieViewBrief {movie} /></li>
    {:else}
        <li>No movies...</li>
    {/each}
</ul>
