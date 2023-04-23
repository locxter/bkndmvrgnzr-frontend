<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { MovieCreateDto } from '$lib/movie/api/movie-create-dto';
    import MovieCreate from '$lib/movie/component/MovieCreate.svelte';
    import { goto } from '$app/navigation';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { GenreController } from '$lib/genre/api/genre-controller';

    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let genreController: GenreController;
    let movieContributorController: MovieContributorController;
    let movieCreate: MovieCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieController = new MovieController(serverAddress, jwt);
        genreController = new GenreController(serverAddress, jwt);
        movieContributorController = new MovieContributorController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieController = new MovieController(serverAddress, jwt);
        genreController = new GenreController(serverAddress, jwt);
        movieContributorController = new MovieContributorController(serverAddress, jwt);
    });

    async function createMovie() {
        try {
            let data = await movieController.createMovie(movieCreate);
            alert('Movie successfully created');
            goto('/movie/' + data.isan);
        } catch (error) {
            console.error(error);
            alert(error);
        }
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
    <MovieCreate bind:movieCreate {genreController} {movieContributorController} />
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
