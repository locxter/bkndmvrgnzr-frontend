<script lang="ts">
    import { MovieRole } from '../db/movie-role';

    export let movieRole: MovieRole = new MovieRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRole.name} />
</p>
<p>* Required</p>
