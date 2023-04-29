<script lang="ts">
    import type { RoleController } from '../api/role-controller';
    import type { Role } from '../db/role';

    export let roleController: RoleController;
    export let roles: Role[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                roles = await roleController.getAllRolesOfSearchQuery(query.trim());
            } else {
                roles = await roleController.getAllRoles();
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
