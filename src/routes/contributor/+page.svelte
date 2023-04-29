<script lang="ts">
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import ContributorSearch from '$lib/contributor/component/ContributorSearch.svelte';
    import type { Contributor } from '$lib/contributor/db/contributor';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: contributorController = new ContributorController($globalServerAddress, $globalJwt);
    let contributors: Contributor[] = [];

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
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/contributor/create">
                <button>Create contributor</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
