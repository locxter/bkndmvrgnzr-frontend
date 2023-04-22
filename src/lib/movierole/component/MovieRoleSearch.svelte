<script lang="ts">
    import type { MovieRoleController } from '../api/movie-role-controller';
    import type { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRoleController: MovieRoleController;
    export let movieRoles: MovieRoleResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            movieRoleController
                .getAllMovieRolesOfSearchQuery(query.trim())
                .then((data) => {
                    movieRoles = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            movieRoleController
                .getAllMovieRoles()
                .then((data) => {
                    movieRoles = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
