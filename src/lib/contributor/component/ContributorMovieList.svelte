<script lang="ts">
    import type { MovieController } from '$lib/movie/api/movie-controller';
    import MovieViewBrief from '$lib/movie/component/MovieViewBrief.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';
    import type { MovieRoleBrief } from '$lib/movierole/db/movie-role-brief';
    import type { Contributor } from '../db/contributor';

    export let contributor: Contributor;
    export let movieController: MovieController;

    let movieRolesMovies: { movieRole: MovieRoleBrief; movies: Movie[] }[] = [];

    $: loadIndirectData(contributor);

    async function loadIndirectData(contributor: Contributor) {
        try {
            movieRolesMovies = [];
            for (let movieContributor of contributor.movieContributors) {
                let data = await movieController.getAllMoviesOfMovieContributor(movieContributor.id);
                if (data.length) {
                    movieRolesMovies = [
                        ...movieRolesMovies,
                        {
                            movieRole: movieContributor.movieRole,
                            movies: data,
                        },
                    ];
                }
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<ul>
    {#each movieRolesMovies as movieRoleMovies}
        {#each movieRoleMovies.movies as movieRoleMovie}
            <li>
                <MovieRoleViewBrief movieRole={movieRoleMovies.movieRole} />
                :
                <MovieViewBrief movie={movieRoleMovie} />
            </li>
        {/each}
    {:else}
        <li>No movies</li>
    {/each}
</ul>
