<script lang="ts">
    import type { MovieBrief } from '../db/movie-brief';

    export let movie: MovieBrief;
</script>

<a href="/movie/{movie.isan.value}">
    {movie.title}
    {#if movie.year}
        ({movie.year})
    {/if}
</a>
