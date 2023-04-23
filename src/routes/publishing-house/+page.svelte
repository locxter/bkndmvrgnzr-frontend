<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import type { PublishingHouseResponseDto } from '$lib/publishinghouse/api/publishing-house-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let publishingHouseController: PublishingHouseController;
    let publishingHouses: PublishingHouseResponseDto[];

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
            publishingHouses = await publishingHouseController.getAllPublishingHouses();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Publishing house | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Publishing house</h2>
    <PublishingHouseSearch {publishingHouseController} bind:publishingHouses />
    <PublishingHouseList {publishingHouses} />
    <p>
        <a href="/publishing-house/create">
            <button>Create publishing house</button>
        </a>
    </p>
</main>
<Footer />
