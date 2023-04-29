<script lang="ts">
    import type { BookRoleController } from '../api/book-role-controller';
    import type { BookRole } from '../db/book-role';

    export let bookRoleController: BookRoleController;
    export let bookRoles: BookRole[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                bookRoles = await bookRoleController.getAllBookRolesOfSearchQuery(query.trim());
            } else {
                bookRoles = await bookRoleController.getAllBookRoles();
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
