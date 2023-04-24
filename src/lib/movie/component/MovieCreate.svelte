<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import type { MovieContributorResponseDto } from '$lib/moviecontributor/api/movie-contributor-response-dto';
    import { onMount } from 'svelte';
    import { MovieCreateDto } from '../api/movie-create-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import MovieContributorSearch from '$lib/moviecontributor/component/MovieContributorSearch.svelte';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';

    export let movieCreate: MovieCreateDto = new MovieCreateDto();
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
        if (movieCreate.genreIds.includes(genre.id)) {
            movieCreate.genreIds.splice(movieCreate.genreIds.indexOf(genre.id), 1);
            movieCreate.genreIds = movieCreate.genreIds;
        } else {
            movieCreate.genreIds = [...movieCreate.genreIds, genre.id];
        }
    }

    function toggleMovieContributor(movieContributor: MovieContributorResponseDto) {
        if (movieCreate.movieContributorIds.includes(movieContributor.id)) {
            movieCreate.movieContributorIds.splice(movieCreate.movieContributorIds.indexOf(movieContributor.id), 1);
            movieCreate.movieContributorIds = movieCreate.movieContributorIds;
        } else {
            movieCreate.movieContributorIds = [...movieCreate.movieContributorIds, movieContributor.id];
        }
    }
</script>

<p>
    ISAN:
    <br />
    <input type="text" placeholder="ISAN" bind:value={movieCreate.isan} />
</p>
<p>
    Title:
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
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if movieCreate.genreIds.includes(genre.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{movieCreate.genreIds.length} genres selected</p>
<p>Contributors:</p>
<MovieContributorSearch bind:movieContributors {movieContributorController} />
<MovieContributorList {movieContributors} let:movieContributor>
    <button on:click={() => toggleMovieContributor(movieContributor)}>
        {#if movieCreate.movieContributorIds.includes(movieContributor.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieContributorList>
<p>{movieCreate.movieContributorIds.length} contributors selected</p>
