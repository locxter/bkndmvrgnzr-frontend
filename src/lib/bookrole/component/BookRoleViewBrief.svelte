<script lang="ts">
    import { BookRoleResponseDto } from '../api/book-role-response-dto';

    export let bookRole: BookRoleResponseDto = new BookRoleResponseDto();
</script>

<a href="/book-role/{bookRole.id}">{bookRole.name}</a>
