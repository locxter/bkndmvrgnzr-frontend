<script lang="ts">
    import { GenreController } from '$lib/genre/api/genre-controller';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    let genres: Genre[] = [];

    onMount(async () => {
        try {
            genres = await genreController.getAllGenres();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Genre | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Genre</h2>
    <GenreSearch {genreController} bind:genres />
    <GenreList {genres} />
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/genre/create">
                <button>Create genre</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
