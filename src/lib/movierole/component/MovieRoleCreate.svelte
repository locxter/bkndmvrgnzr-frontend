<script lang="ts">
    import type { MovieRole } from '../db/movie-role';

    export let movieRole: MovieRole;
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={movieRole.name} />
</p>
<p>* Required</p>
