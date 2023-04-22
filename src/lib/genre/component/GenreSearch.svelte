<script lang="ts">
    import type { GenreController } from '../api/genre-controller';
    import type { GenreResponseDto } from '../api/genre-response-dto';

    export let genreController: GenreController;
    export let genres: GenreResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            genreController
                .getAllGenresOfSearchQuery(query.trim())
                .then((data) => {
                    genres = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            genreController
                .getAllGenres()
                .then((data) => {
                    genres = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
