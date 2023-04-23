<script lang="ts">
    import type { BookContributorController } from '../api/book-contributor-controller';
    import type { BookContributorResponseDto } from '../api/book-contributor-response-dto';

    export let bookContributorController: BookContributorController;
    export let bookContributors: BookContributorResponseDto[] = [];

    let query: string;

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

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
