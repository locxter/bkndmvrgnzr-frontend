<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import GenreUpdate from '$lib/genre/component/GenreUpdate.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import { GenreId } from '$lib/genre/db/genre-id';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let genreId: string;
    let serverAddress: string;
    let jwt: string;
    let genreController: GenreController;
    let genre: Genre;
    let genreUpdate: Genre;

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

    onMount(async () => {
        try {
            genre = await genreController.getGenre(new GenreId(genreId));
            genreUpdate = Object.create(genre);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateGenre() {
        try {
            genre = await genreController.updateGenre(genre.id, genreUpdate);
            alert('Genre successfully updated');
            goto('/genre/' + genre.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteGenre() {
        try {
            await genreController.deleteGenre(genre.id);
            alert('Genre successfully deleted');
            goto('/genre');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update genre | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if genre}
        <h2>Update genre</h2>
        <GenreUpdate bind:genreUpdate />
        <p>
            <button on:click={updateGenre}>Update genre</button>
        </p>
        <p>
            <button on:click={deleteGenre}>Delete genre</button>
        </p>
        <p>
            <a href="/genre/{genre.id.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Genre not found</h2>
    {/if}
</main>
<Footer />
