<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { MovieController } from '$lib/movie/api/movie-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { MovieUpdateDto } from '$lib/movie/api/movie-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import MovieUpdate from '$lib/movie/component/MovieUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { GenreController } from '$lib/genre/api/genre-controller';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';

    let isan: string;
    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let genreController: GenreController;
    let movieContributorController: MovieContributorController;
    let movie: MovieResponseDto;
    let movieUpdate: MovieUpdateDto;

    page.subscribe((data) => {
        isan = data.params.isan;
    });

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

    onMount(async () => {
        try {
            movie = await movieController.getMovie(isan);
            movieUpdate = new MovieUpdateDto(
                movie.title,
                movie.description,
                movie.year,
                movie.playTime,
                movie.ageRestriction,
                movie.genres.map((it) => it.id),
                movie.movieContributors.map((it) => it.id)
            );
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateMovie() {
        try {
            movie = await movieController.updateMovie(movie.isan, movieUpdate);
            alert('Movie successfully updated');
            goto('/movie/' + movie.isan);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteMovie() {
        try {
            await movieController.deleteMovie(movie.isan);
            alert('Movie successfully deleted');
            goto('/movie');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update movie | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if movie}
        <h2>Update movie</h2>
        <MovieUpdate bind:movieUpdate {genreController} {movieContributorController} />
        <p>
            <button on:click={updateMovie}>Update movie</button>
        </p>
        <p>
            <button on:click={deleteMovie}>Delete movie</button>
        </p>
        <p>
            <a href="/movie/{movie.isan}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Movie not found</h2>
    {/if}
</main>
<Footer />
