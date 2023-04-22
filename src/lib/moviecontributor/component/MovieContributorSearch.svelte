<script lang="ts">
    import type { MovieContributorController } from '../api/movie-contributor-controller';
    import type { MovieContributorResponseDto } from '../api/movie-contributor-response-dto';

    export let movieContributorController: MovieContributorController;
    export let movieContributors: MovieContributorResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            movieContributorController
                .getAllMovieContributorsOfSearchQuery(query.trim())
                .then((data) => {
                    movieContributors = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            movieContributorController
                .getAllMovieContributors()
                .then((data) => {
                    movieContributors = data;
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
