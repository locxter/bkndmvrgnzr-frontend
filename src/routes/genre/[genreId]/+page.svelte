<script lang="ts">
    import { page } from '$app/stores';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import GenreView from '$lib/genre/component/GenreView.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import { GenreId } from '$lib/genre/db/genre-id';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    let genre: Genre;

    onMount(async () => {
        try {
            genre = await genreController.getGenre(new GenreId($page.params.genreId));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    {#if genre}
        <title>{genre.name} | bkndmvrgnzr</title>
    {:else}
        <title>Genre not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if genre}
        <GenreView {genre} />
        {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/genre/update/{genre.id.value}">
                    <button>Update genre</button>
                </a>
            </p>
        {/if}
        <p>
            <a href="/genre">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Genre not found</h2>
    {/if}
</main>
<Footer />
