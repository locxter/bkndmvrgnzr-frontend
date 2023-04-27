<script lang="ts">
    import { page } from '$app/stores';
    import { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseView from '$lib/publishinghouse/component/PublishingHouseView.svelte';
    import type { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import { PublishingHouseId } from '$lib/publishinghouse/db/publishing-house-id';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let publishingHouseId: string;
    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
    let publishingHouseController: PublishingHouseController;
    let publishingHouse: PublishingHouse;

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
    globalRoles.subscribe((data) => {
        roles = data;
    });

    onMount(async () => {
        try {
            publishingHouse = await publishingHouseController.getPublishingHouse(
                new PublishingHouseId(publishingHouseId)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
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
        {#if roles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/publishing-house/update/{publishingHouse.id.value}">
                    <button>Update publishing house</button>
                </a>
            </p>
        {/if}
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
