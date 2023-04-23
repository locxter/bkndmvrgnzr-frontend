<script lang="ts">
    import type { PublishingHouseController } from '../api/publishing-house-controller';
    import type { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';

    export let publishingHouseController: PublishingHouseController;
    export let publishingHouses: PublishingHouseResponseDto[] = [];

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
