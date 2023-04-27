<script lang="ts">
    import { BookRole } from '../db/book-role';

    export let bookRoleCreate: BookRole = new BookRole();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRoleCreate.name} />
</p>
<p>* Required</p>
