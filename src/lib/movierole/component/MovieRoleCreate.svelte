<script lang="ts">
    import { MovieRoleCreateDto } from '../api/movie-role-create-dto';

    export let movieRoleCreate: MovieRoleCreateDto = new MovieRoleCreateDto();
</script>

<p>
    Name:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRoleCreate.name} />
</p>
