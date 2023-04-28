<script lang="ts">
    import { goto } from '$app/navigation';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleCreate from '$lib/movierole/component/MovieRoleCreate.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let movieRoleController: MovieRoleController;
    let movieRole: MovieRole;

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
            let data = await movieRoleController.createMovieRole(movieRole);
            alert('Movie role successfully created');
            goto('/movie-role/' + data.id.value);
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
    <MovieRoleCreate bind:movieRole />
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
