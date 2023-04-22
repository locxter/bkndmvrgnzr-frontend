<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { MovieCreateDto } from '$lib/movie/api/movie-create-dto';
    import MovieCreate from '$lib/movie/component/MovieCreate.svelte';
    import { goto } from '$app/navigation';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movieCreate: MovieCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieController = new MovieController(serverAddress, jwt);
    });

    function createMovie() {
        movieController
            .createMovie(movieCreate)
            .then((data) => {
                alert('Movie successfully created');
                goto('/movie/' + data.isan);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }
</script>

<svelte:head>
    <title>Create movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create movie</h2>
    <MovieCreate bind:movieCreate />
    <p>
        <button on:click={createMovie}>Create movie</button>
    </p>
    <p>
        <a href="/movie">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
