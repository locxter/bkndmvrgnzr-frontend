<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { ContributorUpdateDto } from '$lib/contributor/api/contributor-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import ContributorUpdate from '$lib/contributor/component/ContributorUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';

    let contributorId: string;
    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let contributor: ContributorResponseDto;
    let contributorUpdate: ContributorUpdateDto;

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
                contributorUpdate = contributor as ContributorUpdateDto;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });

    function updateContributor() {
        contributorController
            .updateContributor(contributor.id, contributorUpdate)
            .then((data) => {
                contributor = data;
                alert('Contributor successfully updated');
                goto('/contributor/' + contributor.id);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function deleteContributor() {
        contributorController
            .deleteContributor(contributor.id)
            .then((data) => {
                alert('Contributor successfully deleted');
                goto('/contributor');
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }
</script>

<svelte:head>
    <title>Update contributor | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if contributor}
        <h2>Update contributor</h2>
        <ContributorUpdate bind:contributorUpdate />
        <p>
            <button on:click={updateContributor}>Update contributor</button>
        </p>
        <p>
            <button on:click={deleteContributor}>Delete contributor</button>
        </p>
        <p>
            <a href="/contributor/{contributor.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Contributor not found</h2>
    {/if}
</main>
<Footer />
