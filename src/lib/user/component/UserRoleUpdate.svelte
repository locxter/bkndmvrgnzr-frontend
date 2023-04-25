<script lang="ts">
    import { onMount } from 'svelte';
    import RoleSearch from '$lib/role/component/RoleSearch.svelte';
    import RoleList from '$lib/role/component/RoleList.svelte';
    import type { RoleController } from '$lib/role/api/role-controller';
    import type { RoleResponseDto } from '$lib/role/api/role-response-dto';

    export let userUpdateRoles: RoleResponseDto[] = [];
    export let roleController: RoleController;

    let roles: RoleResponseDto[] = [];

    onMount(async () => {
        try {
            roles = await roleController.getAllRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleRole(role: RoleResponseDto) {
        if (userUpdateRoles.map((it) => it.id).includes(role.id)) {
            userUpdateRoles.splice(userUpdateRoles.map((it) => it.id).indexOf(role.id), 1);
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
        {#if userUpdateRoles.map((it) => it.id).includes(role.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</RoleList>
<p>{userUpdateRoles.length} roles selected</p>
