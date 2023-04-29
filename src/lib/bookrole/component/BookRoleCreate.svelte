<script lang="ts">
    import type { BookRole } from '../db/book-role';

    export let bookRole: BookRole;
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRole.name} />
</p>
<p>* Required</p>
