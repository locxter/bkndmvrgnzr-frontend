<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let genreController: GenreController;
    let genres: GenreResponseDto[];

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
            .getAllGenres()
            .then((data) => {
                genres = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
    <p>
        <a href="/genre/create">
            <button>Create genre</button>
        </a>
    </p>
</main>
<Footer />
