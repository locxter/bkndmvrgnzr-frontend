<script lang="ts">
    import { MovieResponseDto } from '$lib/movie/api/movie-response-dto';

    export let movie: MovieResponseDto = new MovieResponseDto();
</script>

<a href="/movie/{movie.isan}">{movie.title} ({movie.year})</a>
