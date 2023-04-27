<script lang="ts">
    import { BookRoleUpdateDto } from '../api/book-role-update-dto';

    export let bookRoleUpdate: BookRoleUpdateDto = new BookRoleUpdateDto();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRoleUpdate.name} />
</p>
<p>* Required</p>
