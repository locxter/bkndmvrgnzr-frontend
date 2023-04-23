<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { MovieRoleCreateDto } from '$lib/movierole/api/movie-role-create-dto';
    import MovieRoleCreate from '$lib/movierole/component/MovieRoleCreate.svelte';
    import { goto } from '$app/navigation';

    let serverAddress: string;
    let jwt: string;
    let movieRoleController: MovieRoleController;
    let movieRoleCreate: MovieRoleCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        movieRoleController = new MovieRoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        movieRoleController = new MovieRoleController(serverAddress, jwt);
    });

    async function createMovieRole() {
        try {
            let data = await movieRoleController.createMovieRole(movieRoleCreate);
            alert('Movie role successfully created');
            goto('/movie-role/' + data.id);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create movie role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create movie role</h2>
    <MovieRoleCreate bind:movieRoleCreate />
    <p>
        <button on:click={createMovieRole}>Create movie role</button>
    </p>
    <p>
        <a href="/movie-role">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
