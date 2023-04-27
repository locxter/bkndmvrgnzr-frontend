<script lang="ts">
    import { BookRole } from '../db/book-role';

    export let bookRoleUpdate: BookRole = new BookRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRoleUpdate.name} />
</p>
<p>* Required</p>
