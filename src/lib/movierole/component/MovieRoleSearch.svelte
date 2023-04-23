<script lang="ts">
    import type { MovieRoleController } from '../api/movie-role-controller';
    import type { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRoleController: MovieRoleController;
    export let movieRoles: MovieRoleResponseDto[] = [];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                movieRoles = await movieRoleController.getAllMovieRolesOfSearchQuery(query.trim());
            } else {
                movieRoles = await movieRoleController.getAllMovieRoles();
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
