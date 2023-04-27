<script lang="ts">
    import { Genre } from '../db/genre';

    export let genreCreate: Genre = new Genre();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={genreCreate.name} />
</p>
<p>* Required</p>
