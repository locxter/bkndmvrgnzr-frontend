<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { GenreUpdateDto } from '$lib/genre/api/genre-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import GenreUpdate from '$lib/genre/component/GenreUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';

    let genreId: string;
    let serverAddress: string;
    let jwt: string;
    let genreController: GenreController;
    let genre: GenreResponseDto;
    let genreUpdate: GenreUpdateDto;

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
                genreUpdate = genre as GenreUpdateDto;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });

    function updateGenre() {
        genreController
            .updateGenre(genre.id, genreUpdate)
            .then((data) => {
                genre = data;
                alert('Genre successfully updated');
                goto('/genre/' + genre.id);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function deleteGenre() {
        genreController
            .deleteGenre(genre.id)
            .then((data) => {
                alert('Genre successfully deleted');
                goto('/genre');
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
            <a href="/genre/{genre.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Genre not found</h2>
    {/if}
</main>
<Footer />
