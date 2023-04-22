<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { GenreCreateDto } from '$lib/genre/api/genre-create-dto';
    import GenreCreate from '$lib/genre/component/GenreCreate.svelte';
    import { goto } from '$app/navigation';

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

    function createGenre() {
        genreController
            .createGenre(genreCreate)
            .then((data) => {
                alert('Genre successfully added');
                goto('/genre/' + data.id);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
