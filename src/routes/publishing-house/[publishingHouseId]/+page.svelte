<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import PublishingHouseView from '$lib/publishinghouse/component/PublishingHouseView.svelte';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import type { PublishingHouseResponseDto } from '$lib/publishinghouse/api/publishing-house-response-dto';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';

    let publishingHouseId: string;
    let serverAddress: string;
    let jwt: string;
    let publishingHouseController: PublishingHouseController;
    let publishingHouse: PublishingHouseResponseDto;

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

    onMount(() => {
        publishingHouseController
            .getPublishingHouse(publishingHouseId)
            .then((data) => {
                publishingHouse = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });
</script>

<svelte:head>
    {#if publishingHouse}
        <title>{publishingHouse.name} | bkndmvrgnzr</title>
    {:else}
        <title>Publishing house not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if publishingHouse}
        <PublishingHouseView {publishingHouse} />
        <p>
            <a href="/publishing-house/update/{publishingHouse.id}">
                <button>Update publishing house</button>
            </a>
        </p>
        <p>
            <a href="/publishing-house">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Publishing house not found</h2>
    {/if}
</main>
<Footer />
