<script lang="ts">
    import type { PublishingHouseController } from '../api/publishing-house-controller';
    import type { PublishingHouse } from '../db/publishing-house';

    export let publishingHouseController: PublishingHouseController;
    export let publishingHouses: PublishingHouse[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                publishingHouses = await publishingHouseController.getAllPublishingHousesOfSearchQuery(query.trim());
            } else {
                publishingHouses = await publishingHouseController.getAllPublishingHouses();
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
