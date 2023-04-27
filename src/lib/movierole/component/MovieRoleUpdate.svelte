<script lang="ts">
    import { MovieRoleUpdateDto } from '../api/movie-role-update-dto';

    export let movieRoleUpdate: MovieRoleUpdateDto = new MovieRoleUpdateDto();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRoleUpdate.name} />
</p>
<p>* Required</p>
