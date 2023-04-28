<script lang="ts">
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';
    import type { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import type { PublishingHouseBrief } from '$lib/publishinghouse/db/publishing-house-brief';
    import { onMount } from 'svelte';
    import { Book } from '../db/book';

    export let book: Book = new Book();
    export let publishingHouseController: PublishingHouseController;

    let publishingHouses: PublishingHouse[] = [];

    onMount(async () => {
        try {
            publishingHouses = await publishingHouseController.getAllPublishingHouses();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function togglePublishingHouse(publishingHouse: PublishingHouseBrief) {
        if (book.publishingHouse.id.value === publishingHouse.id.value) {
            book.publishingHouse.id.value = '';
        } else {
            book.publishingHouse = publishingHouse;
        }
    }
</script>

<PublishingHouseSearch bind:publishingHouses {publishingHouseController} />
<PublishingHouseList {publishingHouses} let:publishingHouse>
    <button on:click={() => togglePublishingHouse(publishingHouse)}>
        {#if book.publishingHouse.id.value === publishingHouse.id.value}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</PublishingHouseList>
{#if book.publishingHouse.id.value}
    <p>Publishing house selected</p>
{:else}
    <p>No publishing house selected</p>
{/if}
