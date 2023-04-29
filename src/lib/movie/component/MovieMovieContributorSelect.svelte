<script lang="ts">
    import type { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import MovieContributorSearch from '$lib/moviecontributor/component/MovieContributorSearch.svelte';
    import type { MovieContributor } from '$lib/moviecontributor/db/movie-contributor';
    import type { MovieContributorBrief } from '$lib/moviecontributor/db/movie-contributor-brief';
    import { onMount } from 'svelte';
    import type { Movie } from '../db/movie';

    export let movie: Movie;
    export let movieContributorController: MovieContributorController;

    let movieContributors: MovieContributor[] = [];

    onMount(async () => {
        try {
            movieContributors = await movieContributorController.getAllMovieContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleMovieContributor(movieContributor: MovieContributorBrief) {
        if (movie.movieContributors.map((it) => it.id.value).includes(movieContributor.id.value)) {
            movie.movieContributors.splice(
                movie.movieContributors.map((it) => it.id.value).indexOf(movieContributor.id.value),
                1
            );
            movie.movieContributors = movie.movieContributors;
        } else {
            movie.movieContributors = [...movie.movieContributors, movieContributor];
        }
    }
</script>

<MovieContributorSearch bind:movieContributors {movieContributorController} />
<MovieContributorList {movieContributors} let:movieContributor>
    <button class="select-button" on:click={() => toggleMovieContributor(movieContributor)}>
        {#if movie.movieContributors.map((it) => it.id.value).includes(movieContributor.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieContributorList>
<p>
    {movie.movieContributors.length}
    {#if movie.movieContributors.length === 1}
        contributor
    {:else}
        contributors
    {/if}
    selected
</p>
