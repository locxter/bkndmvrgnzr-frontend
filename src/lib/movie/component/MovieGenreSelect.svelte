<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import { onMount } from 'svelte';
    import type { Movie } from '../db/movie';

    export let movie: Movie;
    export let genreController: GenreController;

    let genres: Genre[] = [];

    onMount(async () => {
        try {
            genres = await genreController.getAllGenres();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleGenre(genre: GenreBrief) {
        if (movie.genres.map((it) => it.id.value).includes(genre.id.value)) {
            movie.genres.splice(movie.genres.map((it) => it.id.value).indexOf(genre.id.value), 1);
            movie.genres = movie.genres;
        } else {
            movie.genres = [...movie.genres, genre];
        }
    }
</script>

<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button class="select-button" on:click={() => toggleGenre(genre)}>
        {#if movie.genres.map((it) => it.id.value).includes(genre.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>
    {movie.genres.length}
    {#if movie.genres.length === 1}
        genre
    {:else}
        genres
    {/if}
    selected
</p>
