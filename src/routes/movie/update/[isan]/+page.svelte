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

    let isan: string;
    let serverAddress: string;
    let jwt: string;
    let movieController: MovieController;
    let movie: MovieResponseDto;
    let movieUpdate: MovieUpdateDto;

    page.subscribe((data) => {
        isan = data.params.isan;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieController = new MovieController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieController = new MovieController(serverAddress, jwt);
    });

    onMount(() => {
        movieController
            .getMovie(isan)
            .then((data) => {
                movie = data;
                movieUpdate = new MovieUpdateDto(
                    movie.title,
                    movie.description,
                    movie.year,
                    movie.playTime,
                    movie.ageRestriction,
                    movie.genres.map((it) => it.id),
                    movie.movieContributors.map((it) => it.id)
                );
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });

    function updateMovie() {
        movieController
            .updateMovie(movie.isan, movieUpdate)
            .then((data) => {
                movie = data;
                alert('Movie successfully updated');
                goto('/movie/' + movie.isan);
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function deleteMovie() {
        movieController
            .deleteMovie(movie.isan)
            .then((data) => {
                alert('Movie successfully deleted');
                goto('/movie');
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
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
        <MovieUpdate bind:movieUpdate />
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
