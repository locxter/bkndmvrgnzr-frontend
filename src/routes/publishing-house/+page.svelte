<script lang="ts">
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';
    import type { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: publishingHouseController = new PublishingHouseController($globalServerAddress, $globalJwt);
    let publishingHouses: PublishingHouse[] = [];

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
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/publishing-house/create">
                <button>Create publishing house</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
