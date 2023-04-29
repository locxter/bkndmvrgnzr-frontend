<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseUpdate from '$lib/publishinghouse/component/PublishingHouseUpdate.svelte';
    import type { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import { PublishingHouseId } from '$lib/publishinghouse/db/publishing-house-id';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    $: publishingHouseController = new PublishingHouseController($globalServerAddress, $globalJwt);
    let publishingHouse: PublishingHouse;

    onMount(async () => {
        try {
            publishingHouse = await publishingHouseController.getPublishingHouse(
                new PublishingHouseId($page.params.publishingHouseId)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updatePublishingHouse() {
        try {
            publishingHouse = await publishingHouseController.updatePublishingHouse(
                publishingHouse.id,
                publishingHouse
            );
            alert('Publishing house successfully updated');
            goto('/publishing-house/' + publishingHouse.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deletePublishingHouse() {
        try {
            await publishingHouseController.deletePublishingHouse(publishingHouse.id);
            alert('Publishing house successfully deleted');
            goto('/publishing-house');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update publishing house | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if publishingHouse}
        <h2>Update publishing house</h2>
        <PublishingHouseUpdate bind:publishingHouse />
        <p>
            <button on:click={updatePublishingHouse}>Update publishing house</button>
        </p>
        <p>You can only delete a publishing house, if no books are published by it.</p>
        <p>
            <button on:click={deletePublishingHouse}>Delete publishing house</button>
        </p>
        <p>
            <a href="/publishing-house/{publishingHouse.id.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Publishing house not found</h2>
    {/if}
</main>
<Footer />
