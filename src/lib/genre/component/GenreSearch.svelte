<script lang="ts">
    import type { GenreController } from '../api/genre-controller';
    import type { Genre } from '../db/genre';

    export let genreController: GenreController;
    export let genres: Genre[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                genres = await genreController.getAllGenresOfSearchQuery(query.trim());
            } else {
                genres = await genreController.getAllGenres();
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
