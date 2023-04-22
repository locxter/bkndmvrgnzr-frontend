<script lang="ts">
    import type { UserController } from '../api/user-controller';
    import type { UserResponseDto } from '../api/user-response-dto';

    export let userController: UserController;
    export let users: UserResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            userController
                .getAllUsersOfSearchQuery(query.trim())
                .then((data) => {
                    users = data;
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            userController
                .getAllUsers()
                .then((data) => {
                    users = data;
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
