<script lang="ts">
    import { MovieBrief } from '../db/movie-brief';

    export let movie: MovieBrief = new MovieBrief();
</script>

<a href="/movie/{movie.isan.value}">
    {movie.title}
    {#if movie.year}
        ({movie.year})
    {/if}
</a>
