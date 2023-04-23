<script lang="ts">
    import type { MovieController } from '../api/movie-controller';
    import type { MovieResponseDto } from '../api/movie-response-dto';

    export let movieController: MovieController;
    export let movies: MovieResponseDto[] = [];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                movies = await movieController.getAllMoviesOfSearchQueryFromUser(query.trim());
            } else {
                movies = await movieController.getAllMoviesOfUser();
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
