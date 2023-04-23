<script lang="ts">
    import type { UserController } from '../api/user-controller';
    import type { UserResponseDto } from '../api/user-response-dto';

    export let userController: UserController;
    export let users: UserResponseDto[] = [];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                users = await userController.getAllUsersOfSearchQuery(query.trim());
            } else {
                users = await userController.getAllUsers();
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
