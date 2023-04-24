<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import ContributorSearch from '$lib/contributor/component/ContributorSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let contributors: ContributorResponseDto[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        contributorController = new ContributorController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        contributorController = new ContributorController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            contributors = await contributorController.getAllContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Contributor | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Contributor</h2>
    <ContributorSearch {contributorController} bind:contributors />
    <ContributorList {contributors} />
    <p>
        <a href="/contributor/create">
            <button>Create contributor</button>
        </a>
    </p>
</main>
<Footer />
