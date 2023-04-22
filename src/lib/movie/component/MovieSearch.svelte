<script lang="ts">
    import type { MovieController } from '../api/movie-controller';
    import type { MovieResponseDto } from '../api/movie-response-dto';

    export let movieController: MovieController;
    export let movies: MovieResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            movieController
                .getAllMoviesOfSearchQuery(query.trim())
                .then((data) => {
                    movies = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            movieController
                .getAllMovies()
                .then((data) => {
                    movies = data;
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
