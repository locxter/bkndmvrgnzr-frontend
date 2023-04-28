<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { RoleController } from '$lib/role/api/role-controller';
    import type { Role } from '$lib/role/db/role';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import type { PasswordUpdateAdminDto } from '$lib/user/api/password-update-admin-dto';
    import { UserController } from '$lib/user/api/user-controller';
    import type { UserDeleteAdminDto } from '$lib/user/api/user-delete-admin-dto';
    import PasswordUpdateAdmin from '$lib/user/component/PasswordUpdateAdmin.svelte';
    import UserDeleteAdmin from '$lib/user/component/UserDeleteAdmin.svelte';
    import UserRoleSelect from '$lib/user/component/UserRoleSelect.svelte';
    import UserUpdate from '$lib/user/component/UserUpdate.svelte';
    import type { User } from '$lib/user/db/user';
    import { UserId } from '$lib/user/db/user-id';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let userId: string;
    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let roleController: RoleController;
    let user: User;
    let userRolesOld: Role[] = [];
    let userRoles: Role[] = [];
    let passwordUpdateAdmin: PasswordUpdateAdminDto;
    let userDeleteAdmin: UserDeleteAdminDto;

    page.subscribe((data) => {
        userId = data.params.userId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        userController = new UserController(serverAddress, jwt);
        roleController = new RoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        userController = new UserController(serverAddress, jwt);
        roleController = new RoleController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            user = await userController.getSpecificUser(new UserId(userId));
            userRoles = await roleController.getAllRolesOfSpecificUser(user.id);
            userRolesOld = [...userRoles];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateUser() {
        try {
            user = await userController.updateSpecificUser(user.id, user);
            // Remove unselected roles
            for (let userRoleOld of userRolesOld) {
                if (!userRoles.map((it) => it.id).includes(userRoleOld.id)) {
                    await roleController.removeRoleFromSpecificUser(user.id, userRoleOld.id);
                }
            }
            // Add new roles
            for (let userRole of userRoles) {
                if (!userRolesOld.map((it) => it.id).includes(userRole.id)) {
                    await roleController.addRoleToSpecificUser(user.id, userRole.id);
                }
            }
            alert('User successfully updated');
            goto('/user/' + user.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function updatePassword() {
        try {
            user = await userController.updateSpecificUsersPassword(user.id, passwordUpdateAdmin);
            alert('Password successfully updated');
            goto('/user/' + user.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteUser() {
        try {
            await userController.deleteSpecificUser(user.id, userDeleteAdmin);
            alert('User successfully deleted');
            goto('/user/search');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update user | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if user}
        <h2>Update user</h2>
        <UserUpdate bind:user />
        <UserRoleSelect bind:userRoles {roleController} />
        <p>
            <button on:click={updateUser}>Update user</button>
        </p>
        <p>
            <a href="/user/{user.id.value}">
                <button>Return</button>
            </a>
        </p>
        <h3>Danger zone</h3>
        <h4>Update password</h4>
        <PasswordUpdateAdmin bind:passwordUpdateAdmin />
        <p>
            <button on:click={updatePassword}>Update password</button>
        </p>
        <h4>Delete user</h4>
        <UserDeleteAdmin bind:userDeleteAdmin />
        <p>
            <button on:click={deleteUser}>Delete user</button>
        </p>
    {:else}
        <h2>User not found</h2>
    {/if}
</main>
<Footer />
