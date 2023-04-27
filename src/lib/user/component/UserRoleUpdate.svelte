<script lang="ts">
    import type { RoleController } from '$lib/role/api/role-controller';
    import RoleList from '$lib/role/component/RoleList.svelte';
    import RoleSearch from '$lib/role/component/RoleSearch.svelte';
    import type { Role } from '$lib/role/db/role';
    import { onMount } from 'svelte';

    export let userUpdateRoles: Role[] = [];
    export let roleController: RoleController;

    let roles: Role[] = [];

    onMount(async () => {
        try {
            roles = await roleController.getAllRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleRole(role: Role) {
        if (userUpdateRoles.map((it) => it.id.value).includes(role.id.value)) {
            userUpdateRoles.splice(userUpdateRoles.map((it) => it.id.value).indexOf(role.id.value), 1);
            userUpdateRoles = userUpdateRoles;
        } else {
            userUpdateRoles = [...userUpdateRoles, role];
        }
    }
</script>

<p>Roles:</p>
<RoleSearch bind:roles {roleController} />
<RoleList {roles} let:role>
    <button on:click={() => toggleRole(role)}>
        {#if userUpdateRoles.map((it) => it.id.value).includes(role.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</RoleList>
<p>{userUpdateRoles.length} roles selected</p>
