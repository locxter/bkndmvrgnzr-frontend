<script lang="ts">
    import type { ContributorController } from '../api/contributor-controller';
    import type { ContributorResponseDto } from '../api/contributor-response-dto';

    export let contributorController: ContributorController;
    export let contributors: ContributorResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            contributorController
                .getAllContributorsOfSearchQuery(query.trim())
                .then((data) => {
                    contributors = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            contributorController
                .getAllContributors()
                .then((data) => {
                    contributors = data;
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
