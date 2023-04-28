<script lang="ts">
    import { goto } from '$app/navigation';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import type { PasswordUpdateDto } from '$lib/user/api/password-update-dto';
    import { UserController } from '$lib/user/api/user-controller';
    import type { UserDeleteDto } from '$lib/user/api/user-delete-dto';
    import PasswordUpdate from '$lib/user/component/PasswordUpdate.svelte';
    import UserDelete from '$lib/user/component/UserDelete.svelte';
    import UserUpdate from '$lib/user/component/UserUpdate.svelte';
    import type { User } from '$lib/user/db/user';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let user: User;
    let passwordUpdate: PasswordUpdateDto;
    let userDelete: UserDeleteDto;

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
            user = await userController.getUser();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateUser() {
        try {
            user = await userController.updateUser(user);
            alert('User successfully updated');
            goto('/user');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function updatePassword() {
        try {
            user = await userController.updatePassword(passwordUpdate);
            alert('Password successfully updated');
            goto('/user');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteUser() {
        try {
            await userController.deleteUser(userDelete);
            alert('User successfully deleted');
            globalJwt.set('');
            goto('/');
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
        <p>
            <button on:click={updateUser}>Update user</button>
        </p>
        <h3>Danger zone</h3>
        <h4>Update password</h4>
        <PasswordUpdate bind:passwordUpdate />
        <p>
            <button on:click={updatePassword}>Update password</button>
        </p>
        <h4>Delete user</h4>
        <UserDelete bind:userDelete />
        <p>
            <button on:click={deleteUser}>Delete user</button>
        </p>
    {:else}
        <h2>User not found</h2>
    {/if}
</main>
<Footer />
