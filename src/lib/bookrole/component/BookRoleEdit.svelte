<script lang="ts">
    import { BookRoleUpdateDto } from '../api/book-role-update-dto';

    export let bookRole: BookRoleUpdateDto = new BookRoleUpdateDto();
</script>

<p>
    Name:
    <br />
    <input type="text" placeholder="Name" bind:value={bookRole.name} />
</p>
