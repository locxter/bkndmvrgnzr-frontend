<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import type { MovieContributorResponseDto } from '$lib/moviecontributor/api/movie-contributor-response-dto';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import MovieContributorSearch from '$lib/moviecontributor/component/MovieContributorSearch.svelte';
    import { onMount } from 'svelte';
    import { MovieUpdateDto } from '../api/movie-update-dto';

    export let movieUpdate: MovieUpdateDto = new MovieUpdateDto();
    export let genreController: GenreController;
    export let movieContributorController: MovieContributorController;

    let genres: GenreResponseDto[] = [];
    let movieContributors: MovieContributorResponseDto[] = [];

    onMount(async () => {
        try {
            genres = await genreController.getAllGenres();
            movieContributors = await movieContributorController.getAllMovieContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleGenre(genre: GenreResponseDto) {
        if (movieUpdate.genreIds.includes(genre.id)) {
            movieUpdate.genreIds.splice(movieUpdate.genreIds.indexOf(genre.id), 1);
            movieUpdate.genreIds = movieUpdate.genreIds;
        } else {
            movieUpdate.genreIds = [...movieUpdate.genreIds, genre.id];
        }
    }

    function toggleMovieContributor(movieContributor: MovieContributorResponseDto) {
        if (movieUpdate.movieContributorIds.includes(movieContributor.id)) {
            movieUpdate.movieContributorIds.splice(movieUpdate.movieContributorIds.indexOf(movieContributor.id), 1);
            movieUpdate.movieContributorIds = movieUpdate.movieContributorIds;
        } else {
            movieUpdate.movieContributorIds = [...movieUpdate.movieContributorIds, movieContributor.id];
        }
    }
</script>

<p>
    Title:
    <br />
    <input type="text" placeholder="Title" bind:value={movieUpdate.title} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={movieUpdate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={movieUpdate.year} />
</p>
<p>
    Play time:
    <br />
    <input type="number" min="0" placeholder="Play time" bind:value={movieUpdate.playTime} />
</p>
<p>
    Age restriction:
    <br />
    <input type="number" min="0" placeholder="Age restriction" bind:value={movieUpdate.ageRestriction} />
</p>
<p>Genres:</p>
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if movieUpdate.genreIds.includes(genre.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{movieUpdate.genreIds.length} genres selected</p>
<p>Contributors:</p>
<MovieContributorSearch bind:movieContributors {movieContributorController} />
<MovieContributorList {movieContributors} let:movieContributor>
    <button on:click={() => toggleMovieContributor(movieContributor)}>
        {#if movieUpdate.movieContributorIds.includes(movieContributor.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieContributorList>
<p>{movieUpdate.movieContributorIds.length} contributors selected</p>
