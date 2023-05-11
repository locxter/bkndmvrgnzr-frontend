<script lang="ts">
    import type { Movie } from '$lib/movie/db/movie';
    import type { MovieImportController } from '../api/movie-import-controller';
    import type { MovieImportResponseDto } from '../api/movie-import-response-dto';

    export let movie: Movie;
    export let movieImportResponse: MovieImportResponseDto;
    export let movieImportController: MovieImportController;

    async function importMovie() {
        try {
            movieImportResponse = await movieImportController.importMovie(movie.isan);
            movie.title = movieImportResponse.title ? movieImportResponse.title : movie.title;
            movie.year = movieImportResponse.year ? movieImportResponse.year : movie.year;
            movie.playTime = movieImportResponse.playTime ? movieImportResponse.playTime : movie.playTime;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<p>
    <button on:click={importMovie}>Import movie</button>
</p>
