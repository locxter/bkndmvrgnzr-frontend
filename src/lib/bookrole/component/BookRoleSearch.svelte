<script lang="ts">
    import type { BookRoleController } from '../api/book-role-controller';
    import type { BookRoleResponseDto } from '../api/book-role-response-dto';

    export let bookRoleController: BookRoleController;
    export let bookRoles: BookRoleResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            bookRoleController
                .getAllBookRolesOfSearchQuery(query.trim())
                .then((data) => {
                    bookRoles = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            bookRoleController
                .getAllBookRoles()
                .then((data) => {
                    bookRoles = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
