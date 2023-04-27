<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import MovieContributorSearch from '$lib/moviecontributor/component/MovieContributorSearch.svelte';
    import type { MovieContributor } from '$lib/moviecontributor/db/movie-contributor';
    import type { MovieContributorBrief } from '$lib/moviecontributor/db/movie-contributor-brief';
    import { onMount } from 'svelte';
    import { Movie } from '../db/movie';

    export let movieCreate: Movie = new Movie();
    export let genreController: GenreController;
    export let movieContributorController: MovieContributorController;

    let genres: Genre[] = [];
    let movieContributors: MovieContributor[] = [];

    onMount(async () => {
        try {
            genres = await genreController.getAllGenres();
            movieContributors = await movieContributorController.getAllMovieContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleGenre(genre: GenreBrief) {
        if (movieCreate.genres.map((it) => it.id.value).includes(genre.id.value)) {
            movieCreate.genres.splice(movieCreate.genres.map((it) => it.id.value).indexOf(genre.id.value), 1);
            movieCreate.genres = movieCreate.genres;
        } else {
            movieCreate.genres = [...movieCreate.genres, genre];
        }
    }

    function toggleMovieContributor(movieContributor: MovieContributorBrief) {
        if (movieCreate.movieContributors.map((it) => it.id.value).includes(movieContributor.id.value)) {
            movieCreate.movieContributors.splice(
                movieCreate.movieContributors.map((it) => it.id.value).indexOf(movieContributor.id.value),
                1
            );
            movieCreate.movieContributors = movieCreate.movieContributors;
        } else {
            movieCreate.movieContributors = [...movieCreate.movieContributors, movieContributor];
        }
    }
</script>

<p>
    ISAN*:
    <br />
    <input type="text" maxlength="33" placeholder="ISAN" bind:value={movieCreate.isan} />
</p>
<p>
    Title*:
    <br />
    <input type="text" placeholder="Title" bind:value={movieCreate.title} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={movieCreate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={movieCreate.year} />
</p>
<p>
    Play time:
    <br />
    <input type="number" min="0" placeholder="Play time" bind:value={movieCreate.playTime} />
</p>
<p>
    Age restriction:
    <br />
    <input type="number" min="0" placeholder="Age restriction" bind:value={movieCreate.ageRestriction} />
</p>
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if movieCreate.genres.map((it) => it.id.value).includes(genre.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{movieCreate.genres.length} genres selected</p>
<p>Contributors:</p>
<MovieContributorSearch bind:movieContributors {movieContributorController} />
<MovieContributorList {movieContributors} let:movieContributor>
    <button on:click={() => toggleMovieContributor(movieContributor)}>
        {#if movieCreate.movieContributors.map((it) => it.id.value).includes(movieContributor.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieContributorList>
<p>{movieCreate.movieContributors.length} contributors selected</p>
<p>* Required</p>
