<script lang="ts">
    import type { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import { onMount } from 'svelte';

    export let contributorBookRoles: BookRole[] = [];
    export let bookRoleController: BookRoleController;

    let bookRoles: BookRole[] = [];

    onMount(async () => {
        try {
            bookRoles = await bookRoleController.getAllBookRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleBookRole(bookRole: BookRoleBrief) {
        if (contributorBookRoles.map((it) => it.id.value).includes(bookRole.id.value)) {
            contributorBookRoles.splice(contributorBookRoles.map((it) => it.id.value).indexOf(bookRole.id.value), 1);
            contributorBookRoles = contributorBookRoles;
        } else {
            contributorBookRoles = [...contributorBookRoles, bookRole as BookRole];
        }
    }
</script>

<BookRoleSearch bind:bookRoles {bookRoleController} />
<BookRoleList {bookRoles} let:bookRole>
    <button on:click={() => toggleBookRole(bookRole)}>
        {#if contributorBookRoles.map((it) => it.id.value).includes(bookRole.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookRoleList>
<p>{contributorBookRoles.length} book roles selected</p>
