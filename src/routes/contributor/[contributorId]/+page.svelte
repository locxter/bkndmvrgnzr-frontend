<script lang="ts">
    import { page } from '$app/stores';
    import { BookController } from '$lib/book/api/book-controller';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import ContributorView from '$lib/contributor/component/ContributorView.svelte';
    import type { Contributor } from '$lib/contributor/db/contributor';
    import { ContributorId } from '$lib/contributor/db/contributor-id';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: contributorController = new ContributorController($globalServerAddress, $globalJwt);
    $: bookController = new BookController($globalServerAddress, $globalJwt);
    $: movieController = new MovieController($globalServerAddress, $globalJwt);
    let contributor: Contributor;

    onMount(async () => {
        try {
            contributor = await contributorController.getContributor(new ContributorId($page.params.contributorId));
        } catch (error) {
            console.error(error);
            alert(error);
        }
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
        <ContributorView {contributor} {bookController} {movieController} />
        {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/contributor/update/{contributor.id.value}">
                    <button>Update contributor</button>
                </a>
            </p>
        {/if}
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
