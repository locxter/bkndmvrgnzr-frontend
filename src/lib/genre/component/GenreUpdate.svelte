<script lang="ts">
    import { Genre } from '../db/genre';

    export let genre: Genre = new Genre();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={genre.name} />
</p>
<p>* Required</p>
