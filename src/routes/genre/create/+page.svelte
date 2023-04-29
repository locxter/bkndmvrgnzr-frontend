<script lang="ts">
    import { goto } from '$app/navigation';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import GenreCreate from '$lib/genre/component/GenreCreate.svelte';
    import { Genre } from '$lib/genre/db/genre';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: genreController = new GenreController($globalServerAddress, $globalJwt);
    let genre = new Genre();

    async function createGenre() {
        try {
            let data = await genreController.createGenre(genre);
            alert('Genre successfully created');
            goto('/genre/' + data.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create genre | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create genre</h2>
    <GenreCreate bind:genre />
    <p>
        <button on:click={createGenre}>Create genre</button>
    </p>
    <p>
        <a href="/genre">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
