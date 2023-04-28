<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { Movie } from '../db/movie';
    import MovieGenreSelect from './MovieGenreSelect.svelte';
    import MovieMovieContributorSelect from './MovieMovieContributorSelect.svelte';

    export let movie: Movie = new Movie();
    export let genreController: GenreController;
    export let movieContributorController: MovieContributorController;
</script>

<p>
    ISAN*:
    <br />
    <input type="text" maxlength="33" placeholder="ISAN" bind:value={movie.isan.value} />
</p>
<p>
    Title*:
    <br />
    <input type="text" placeholder="Title" bind:value={movie.title} />
</p>
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
<MovieMovieContributorSelect bind:movie {movieContributorController} />
<p>* Required</p>
