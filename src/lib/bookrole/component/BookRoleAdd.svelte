<script lang="ts">
    import { BookRoleCreateDto } from '../api/book-role-create-dto';

    export let bookRole: BookRoleCreateDto = new BookRoleCreateDto();
</script>

<p>
    Name:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRole.name} />
</p>
