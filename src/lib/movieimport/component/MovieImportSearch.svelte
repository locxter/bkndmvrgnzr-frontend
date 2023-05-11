<script lang="ts">
    import type { Movie } from '$lib/movie/db/movie';
    import type { MovieImportController } from '../api/movie-import-controller';
    import type { MovieImportResponseBriefDto } from '../api/movie-import-response-brief-dto';
    import { MovieImportSearchResponseDto } from '../api/movie-import-search-response-dto';
    import MovieImportList from './MovieImportList.svelte';

    export let movie: Movie;
    export let movieImportController: MovieImportController;

    let movieImportSearchResponse = new MovieImportSearchResponseDto();

    async function searchMovie() {
        try {
            movieImportSearchResponse = await movieImportController.searchMovie(movie.title);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    function selectIsan(movieImportBrief: MovieImportResponseBriefDto) {
        movie.isan.value = movieImportBrief.isan;
        movie.title = movieImportBrief.title;
        movie.year = movieImportBrief.year;
        movieImportSearchResponse = new MovieImportSearchResponseDto();
    }
</script>

<p>
    <button on:click={searchMovie}>Search movie</button>
</p>
{#if movieImportSearchResponse.movies.length}
    <MovieImportList movieImportBriefs={movieImportSearchResponse.movies} let:movieImportBrief>
        <button class="select-button" on:click={() => selectIsan(movieImportBrief)}>Select</button>
    </MovieImportList>
{/if}
