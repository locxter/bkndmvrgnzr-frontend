<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import type { MovieImportController } from '$lib/movieimport/api/movie-import-controller';
    import { MovieImportResponseDto } from '$lib/movieimport/api/movie-import-response-dto';
    import MovieImport from '$lib/movieimport/component/MovieImport.svelte';
    import MovieImportSearch from '$lib/movieimport/component/MovieImportSearch.svelte';
    import type { Movie } from '../db/movie';
    import MovieGenreSelect from './MovieGenreSelect.svelte';
    import MovieMovieContributorSelect from './MovieMovieContributorSelect.svelte';

    export let movie: Movie;
    export let movieImportController: MovieImportController;
    export let genreController: GenreController;
    export let movieContributorController: MovieContributorController;

    let movieImportResponse = new MovieImportResponseDto();
</script>

<p>
    ISAN*:
    <br />
    <input type="text" maxlength="33" placeholder="ISAN" bind:value={movie.isan.value} />
</p>
<MovieImport bind:movie bind:movieImportResponse {movieImportController} />
<p>
    Title*:
    <br />
    <input type="text" placeholder="Title" bind:value={movie.title} />
</p>
<MovieImportSearch bind:movie {movieImportController} />
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={movie.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={movie.year} />
</p>
<p>
    Play time:
    <br />
    <input type="number" min="0" placeholder="Play time" bind:value={movie.playTime} />
</p>
<p>
    Age restriction:
    <br />
    <input type="number" min="0" placeholder="Age restriction" bind:value={movie.ageRestriction} />
</p>
<p>Genres:</p>
<MovieGenreSelect bind:movie {genreController} />
<p>Contributors:</p>
<MovieMovieContributorSelect
    bind:movie
    bind:query={movieImportResponse.directorLastName}
    {movieContributorController}
/>
<p>* Required</p>
