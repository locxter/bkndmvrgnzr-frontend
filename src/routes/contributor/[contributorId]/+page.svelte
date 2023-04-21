<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';

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
            });
    });
</script>

<svelte:head>
    <title>Contributor | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if contributor}
        <h2>{contributor.lastName}, {contributor.firstName}</h2>
        <p>
            Birth year:
            <br />
            {contributor.birthYear}
        </p>
        <p>
            Birth month:
            <br />
            {contributor.birthMonth}
        </p>
        <p>
            Birth day:
            <br />
            {contributor.birthDay}
        </p>
        <p>Books:</p>
        <ul>
            {#each contributor.bookContributors as bookContributor}
                <li>
                    <a href="">
                        {bookContributor.bookRole.name}: FIND BOOK
                    </a>
                </li>
            {:else}
                <li>No books</li>
            {/each}
        </ul>
        <p>Movies:</p>
        <ul>
            {#each contributor.movieContributors as movieContributor}
                <li>
                    <a href="">
                        {movieContributor.movieRole.name}: FIND MOVIE
                    </a>
                </li>
            {:else}
                <li>No books</li>
            {/each}
        </ul>
    {:else}
        <h2>Contributor not found</h2>
    {/if}
</main>
<Footer />
