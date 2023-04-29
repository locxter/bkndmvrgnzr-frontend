<script lang="ts">
    import type { BookRoleBrief } from '../db/book-role-brief';
    import BookRoleViewBrief from './BookRoleViewBrief.svelte';

    export let bookRoles: BookRoleBrief[];
</script>

<ul>
    {#each bookRoles as bookRole}
        <li>
            <slot {bookRole} />
            <BookRoleViewBrief {bookRole} />
        </li>
    {:else}
        <li>No book roles</li>
    {/each}
</ul>
