<script lang="ts">
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import { onMount } from 'svelte';
    import { Book } from '../db/book';

    export let book: Book = new Book();
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
        if (book.genres.map((it) => it.id.value).includes(genre.id.value)) {
            book.genres.splice(book.genres.map((it) => it.id.value).indexOf(genre.id.value), 1);
            book.genres = book.genres;
        } else {
            book.genres = [...book.genres, genre];
        }
    }
</script>

<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if book.genres.map((it) => it.id.value).includes(genre.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>
    {book.genres.length}
    {#if book.genres.length === 1}
        genre
    {:else}
        genres
    {/if}
    selected
</p>
