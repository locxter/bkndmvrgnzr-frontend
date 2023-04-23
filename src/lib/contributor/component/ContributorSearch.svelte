<script lang="ts">
    import type { ContributorController } from '../api/contributor-controller';
    import type { ContributorResponseDto } from '../api/contributor-response-dto';

    export let contributorController: ContributorController;
    export let contributors: ContributorResponseDto[] = [];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                contributors = await contributorController.getAllContributorsOfSearchQuery(query.trim());
            } else {
                contributors = await contributorController.getAllContributors();
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
