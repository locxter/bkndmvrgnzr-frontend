<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import ContributorView from '$lib/contributor/component/ContributorView.svelte';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';

    let contributorId: string;
    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let contributor: ContributorResponseDto;

    page.subscribe((data) => {
        contributorId = data.params.contributorId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        contributorController = new ContributorController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        contributorController = new ContributorController(serverAddress, jwt);
    });

    onMount(() => {
        contributorController
            .getContributor(contributorId)
            .then((data) => {
                contributor = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });
</script>

<svelte:head>
    {#if contributor}
        <title>{contributor.lastName}, {contributor.firstName} | bkndmvrgnzr</title>
    {:else}
        <title>Contributor not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if contributor}
        <ContributorView {contributor} />
        <p>
            <a href="/contributor/update/{contributor.id}">
                <button>Update contributor</button>
            </a>
        </p>
        <p>
            <a href="/contributor">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Contributor not found</h2>
    {/if}
</main>
<Footer />
