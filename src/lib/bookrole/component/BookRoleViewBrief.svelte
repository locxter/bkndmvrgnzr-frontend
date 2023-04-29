<script lang="ts">
    import type { BookRoleBrief } from '../db/book-role-brief';

    export let bookRole: BookRoleBrief;
</script>

<a href="/book-role/{bookRole.id.value}">{bookRole.name}</a>
