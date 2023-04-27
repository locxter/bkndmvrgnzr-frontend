<script lang="ts">
    import { BookRoleBrief } from '../db/book-role-brief';

    export let bookRole: BookRoleBrief = new BookRoleBrief();
</script>

<a href="/book-role/{bookRole.id.value}">{bookRole.name}</a>
