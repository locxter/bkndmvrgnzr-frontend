<script lang="ts">
    import type { PublishingHouseController } from '../api/publishing-house-controller';
    import type { PublishingHouse } from '../db/publishing-house';

    export let publishingHouses: PublishingHouse[];
    export let query: string = '';
    export let publishingHouseController: PublishingHouseController;

    let showDetails = false;

    $: if (query && query.trim()) {
        showDetails = true;
    }

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

<details bind:open={showDetails}>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
