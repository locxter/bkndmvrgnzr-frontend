<script lang="ts">
    import type { RoleController } from '$lib/role/api/role-controller';
    import RoleList from '$lib/role/component/RoleList.svelte';
    import RoleSearch from '$lib/role/component/RoleSearch.svelte';
    import type { Role } from '$lib/role/db/role';
    import { onMount } from 'svelte';

    export let userRoles: Role[] = [];
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
        if (userRoles.map((it) => it.id.value).includes(role.id.value)) {
            userRoles.splice(userRoles.map((it) => it.id.value).indexOf(role.id.value), 1);
            userRoles = userRoles;
        } else {
            userRoles = [...userRoles, role];
        }
    }
</script>

<p>Roles:</p>
<RoleSearch bind:roles {roleController} />
<RoleList {roles} let:role>
    <button on:click={() => toggleRole(role)}>
        {#if userRoles.map((it) => it.id.value).includes(role.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</RoleList>
<p>{userRoles.length} roles selected</p>
