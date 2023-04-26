<script lang="ts">
    import { goto } from '$app/navigation';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreCreateDto } from '$lib/genre/api/genre-create-dto';
    import GenreCreate from '$lib/genre/component/GenreCreate.svelte';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let genreController: GenreController;
    let genreCreate: GenreCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        genreController = new GenreController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        genreController = new GenreController(serverAddress, jwt);
    });

    async function createGenre() {
        try {
            let data = await genreController.createGenre(genreCreate);
            alert('Genre successfully created');
            goto('/genre/' + data.id);
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
    <GenreCreate bind:genreCreate />
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
