<script lang="ts">
    import { BookRole } from '../db/book-role';

    export let bookRole: BookRole = new BookRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRole.name} />
</p>
<p>* Required</p>
