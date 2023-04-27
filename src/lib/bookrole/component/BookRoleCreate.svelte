<script lang="ts">
    import { BookRoleCreateDto } from '../api/book-role-create-dto';

    export let bookRoleCreate: BookRoleCreateDto = new BookRoleCreateDto();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRoleCreate.name} />
</p>
<p>* Required</p>
