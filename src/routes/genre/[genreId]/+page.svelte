<script lang="ts">
    import { page } from '$app/stores';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreView from '$lib/genre/component/GenreView.svelte';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let genreId: string;
    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
    let genreController: GenreController;
    let genre: GenreResponseDto;

    page.subscribe((data) => {
        genreId = data.params.genreId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        genreController = new GenreController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        genreController = new GenreController(serverAddress, jwt);
    });
    globalRoles.subscribe((data) => {
        roles = data;
    });

    onMount(async () => {
        try {
            genre = await genreController.getGenre(genreId);
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
        {#if roles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/genre/update/{genre.id}">
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
