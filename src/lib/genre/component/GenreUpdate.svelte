<script lang="ts">
    import { Genre } from '../db/genre';

    export let genreUpdate: Genre = new Genre();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={genreUpdate.name} />
</p>
<p>* Required</p>
