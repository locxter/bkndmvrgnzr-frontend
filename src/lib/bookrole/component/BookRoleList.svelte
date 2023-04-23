<script lang="ts">
    import type { BookRoleResponseDto } from '../api/book-role-response-dto';
    import BookRoleViewBrief from './BookRoleViewBrief.svelte';

    export let bookRoles: BookRoleResponseDto[] = [];
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
