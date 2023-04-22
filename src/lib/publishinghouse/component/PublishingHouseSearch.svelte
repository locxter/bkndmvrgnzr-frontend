<script lang="ts">
    import type { PublishingHouseController } from '../api/publishing-house-controller';
    import type { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';

    export let publishingHouseController: PublishingHouseController;
    export let publishingHouses: PublishingHouseResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            publishingHouseController
                .getAllPublishingHousesOfSearchQuery(query.trim())
                .then((data) => {
                    publishingHouses = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            publishingHouseController
                .getAllPublishingHouses()
                .then((data) => {
                    publishingHouses = data;
                    console.log(data);
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
