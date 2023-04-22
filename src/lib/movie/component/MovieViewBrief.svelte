<script lang="ts">
    import { MovieResponseDto } from '../api/movie-response-dto';

    export let movie: MovieResponseDto = new MovieResponseDto();
</script>

<a href="/movie/{movie.isan}">
    {movie.title}
    {#if movie.year}
        ({movie.year})
    {/if}
</a>
