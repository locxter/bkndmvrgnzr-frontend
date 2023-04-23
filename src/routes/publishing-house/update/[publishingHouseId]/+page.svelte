<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { PublishingHouseUpdateDto } from '$lib/publishinghouse/api/publishing-house-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import PublishingHouseUpdate from '$lib/publishinghouse/component/PublishingHouseUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { PublishingHouseResponseDto } from '$lib/publishinghouse/api/publishing-house-response-dto';

    let publishingHouseId: string;
    let serverAddress: string;
    let jwt: string;
    let publishingHouseController: PublishingHouseController;
    let publishingHouse: PublishingHouseResponseDto;
    let publishingHouseUpdate: PublishingHouseUpdateDto;

    page.subscribe((data) => {
        publishingHouseId = data.params.publishingHouseId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        publishingHouseController = new PublishingHouseController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        publishingHouseController = new PublishingHouseController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            publishingHouse = await publishingHouseController.getPublishingHouse(publishingHouseId);
            publishingHouseUpdate = publishingHouse as PublishingHouseUpdateDto;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updatePublishingHouse() {
        try {
            publishingHouse = await publishingHouseController.updatePublishingHouse(
                publishingHouse.id,
                publishingHouseUpdate
            );
            alert('Publishing house successfully updated');
            goto('/publishing-house/' + publishingHouse.id);
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
        <PublishingHouseUpdate bind:publishingHouseUpdate />
        <p>
            <button on:click={updatePublishingHouse}>Update publishing house</button>
        </p>
        <p>
            <button on:click={deletePublishingHouse}>Delete publishing house</button>
        </p>
        <p>
            <a href="/publishing-house/{publishingHouse.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Publishing house not found</h2>
    {/if}
</main>
<Footer />
