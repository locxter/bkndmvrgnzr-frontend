<script lang="ts">
    import { goto } from '$app/navigation';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseCreate from '$lib/publishinghouse/component/PublishingHouseCreate.svelte';
    import { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: publishingHouseController = new PublishingHouseController($globalServerAddress, $globalJwt);
    let publishingHouse = new PublishingHouse();

    async function createPublishingHouse() {
        try {
            let data = await publishingHouseController.createPublishingHouse(publishingHouse);
            alert('Publishing house successfully created');
            goto('/publishing-house/' + data.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create publishing house | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create publishing house</h2>
    <PublishingHouseCreate bind:publishingHouse />
    <p>
        <button on:click={createPublishingHouse}>Create publishing house</button>
    </p>
    <p>
        <a href="/publishing-house">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
