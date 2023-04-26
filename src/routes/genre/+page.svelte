<script lang="ts">
    import { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
    let genreController: GenreController;
    let genres: GenreResponseDto[] = [];

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
    {#if roles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/genre/create">
                <button>Create genre</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
