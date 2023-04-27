<script lang="ts">
    import { MovieRole } from '../db/movie-role';

    export let movieRoleCreate: MovieRole = new MovieRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRoleCreate.name} />
</p>
<p>* Required</p>
