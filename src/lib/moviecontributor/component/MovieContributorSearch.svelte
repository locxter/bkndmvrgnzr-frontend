<script lang="ts">
    import type { MovieContributorController } from '../api/movie-contributor-controller';
    import type { MovieContributor } from '../db/movie-contributor';

    export let movieContributorController: MovieContributorController;
    export let movieContributors: MovieContributor[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                movieContributors = await movieContributorController.getAllMovieContributorsOfSearchQuery(query.trim());
            } else {
                movieContributors = await movieContributorController.getAllMovieContributors();
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
