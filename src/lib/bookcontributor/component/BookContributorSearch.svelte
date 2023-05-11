<script lang="ts">
    import type { BookContributorController } from '../api/book-contributor-controller';
    import type { BookContributor } from '../db/book-contributor';

    export let bookContributorController: BookContributorController;
    export let query: string = '';
    export let bookContributors: BookContributor[];

    $: showDetails = query && query.trim() ? true : false;

    async function search() {
        try {
            if (query && query.trim()) {
                bookContributors = await bookContributorController.getAllBookContributorsOfSearchQuery(query.trim());
            } else {
                bookContributors = await bookContributorController.getAllBookContributors();
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<details bind:open={showDetails}>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
