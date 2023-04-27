<script lang="ts">
    import { MovieRole } from '../db/movie-role';

    export let movieRoleUpdate: MovieRole = new MovieRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRoleUpdate.name} />
</p>
<p>* Required</p>
