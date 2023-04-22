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

    let genres: GenreResponseDto[];
    let movieContributors: MovieContributorResponseDto[];

    onMount(() => {
        genreController
            .getAllGenres()
            .then((data) => {
                genres = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
        movieContributorController
            .getAllMovieContributors()
            .then((data) => {
                movieContributors = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });

    function selectGenre(genre: GenreResponseDto) {
        if (!movieCreate.genreIds.includes(genre.id)) {
            movieCreate.genreIds[movieCreate.genreIds.length] = genre.id;
        }
    }

    function selectMovieContributor(movieContributor: MovieContributorResponseDto) {
        if (!movieCreate.movieContributorIds.includes(movieContributor.id)) {
            movieCreate.movieContributorIds[movieCreate.movieContributorIds.length] = movieContributor.id;
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
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => selectGenre(genre)}>Select</button>
</GenreList>
<p>{movieCreate.genreIds.length} genres selected</p>
<p>Contributors:</p>
<MovieContributorSearch bind:movieContributors {movieContributorController} />
<MovieContributorList {movieContributors} let:movieContributor>
    <button on:click={() => selectMovieContributor(movieContributor)}>Select</button>
</MovieContributorList>
<p>{movieCreate.movieContributorIds.length} contributors selected</p>
