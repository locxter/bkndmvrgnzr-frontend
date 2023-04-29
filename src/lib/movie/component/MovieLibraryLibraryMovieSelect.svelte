<script lang="ts">
    import type { MovieController } from '../api/movie-controller';
    import type { Movie } from '../db/movie';
    import type { MovieBrief } from '../db/movie-brief';
    import MovieLibrarySearch from './MovieLibrarySearch.svelte';
    import MovieList from './MovieList.svelte';

    export let movies: Movie[];
    export let libraryMovies: Movie[];
    export let movieController: MovieController;

    function toggleLibraryMovie(libraryMovie: MovieBrief) {
        if (libraryMovies.map((it) => it.isan.value).includes(libraryMovie.isan.value)) {
            libraryMovies.splice(libraryMovies.map((it) => it.isan.value).indexOf(libraryMovie.isan.value), 1);
            libraryMovies = libraryMovies;
        } else {
            libraryMovies = [...libraryMovies, libraryMovie as Movie];
        }
    }
</script>

<MovieLibrarySearch {movieController} bind:movies />
<MovieList {movies} let:movie>
    <button on:click={() => toggleLibraryMovie(movie)}>
        {#if libraryMovies.map((it) => it.isan.value).includes(movie.isan.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieList>
<p>
    {libraryMovies.length}
    {#if libraryMovies.length === 1}
        movie
    {:else}
        movies
    {/if}
    in library
</p>
