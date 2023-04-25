<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { UserController } from '$lib/user/api/user-controller';
    import type { UserResponseDto } from '$lib/user/api/user-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import type { UserUpdateDto } from '$lib/user/api/user-update-dto';
    import UserUpdate from '$lib/user/component/UserUpdate.svelte';
    import PasswordUpdate from '$lib/user/component/PasswordUpdate.svelte';
    import UserDelete from '$lib/user/component/UserDelete.svelte';
    import { goto } from '$app/navigation';
    import type { PasswordUpdateDto } from '$lib/user/api/password-update-dto';
    import type { UserDeleteDto } from '$lib/user/api/user-delete-dto';
    import { page } from '$app/stores';
    import type { PasswordUpdateAdminDto } from '$lib/user/api/password-update-admin-dto';
    import UserDeleteAdmin from '$lib/user/component/UserDeleteAdmin.svelte';
    import type { UserDeleteAdminDto } from '$lib/user/api/user-delete-admin-dto';
    import PasswordUpdateAdmin from '$lib/user/component/PasswordUpdateAdmin.svelte';

    let userId: string;
    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let user: UserResponseDto;
    let userUpdate: UserUpdateDto;
    let passwordUpdateAdmin: PasswordUpdateAdminDto;
    let userDeleteAdmin: UserDeleteAdminDto;

    page.subscribe((data) => {
        userId = data.params.userId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        userController = new UserController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        userController = new UserController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            user = await userController.getSpecificUser(userId);
            userUpdate = user as UserUpdateDto;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateUser() {
        try {
            user = await userController.updateSpecificUser(user.id, userUpdate);
            alert('User successfully updated');
            goto('/user');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function updatePassword() {
        try {
            user = await userController.updateSpecificUsersPassword(user.id, passwordUpdateAdmin);
            alert('Password successfully updated');
            goto('/user/' + user.id);
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
        <UserUpdate bind:userUpdate />
        <p>
            <button on:click={updateUser}>Update user</button>
        </p>
        <p>
            <a href="/user/{user.id}">
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
