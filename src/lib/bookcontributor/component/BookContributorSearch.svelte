<script lang="ts">
    import type { BookContributorController } from '../api/book-contributor-controller';
    import type { BookContributorResponseDto } from '../api/book-contributor-response-dto';

    export let bookContributorController: BookContributorController;
    export let bookContributors: BookContributorResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            bookContributorController
                .getAllBookContributorsOfSearchQuery(query.trim())
                .then((data) => {
                    bookContributors = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            bookContributorController
                .getAllBookContributors()
                .then((data) => {
                    bookContributors = data;
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
