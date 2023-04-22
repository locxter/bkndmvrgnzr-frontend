<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import GenreView from '$lib/genre/component/GenreView.svelte';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';

    let genreId: string;
    let serverAddress: string;
    let jwt: string;
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

    onMount(() => {
        genreController
            .getGenre(genreId)
            .then((data) => {
                genre = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
        <p>
            <a href="/genre/update/{genre.id}">
                <button>Update genre</button>
            </a>
        </p>
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
