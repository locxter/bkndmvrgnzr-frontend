<script lang="ts">
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import UserList from '$lib/user/component/UserList.svelte';
    import UserSearch from '$lib/user/component/UserSearch.svelte';
    import type { User } from '$lib/user/db/user';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let users: User[] = [];

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
            users = await userController.getAllUsers();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>User search | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>User search</h2>
    <UserSearch {userController} bind:users />
    <UserList {users} />
</main>
<Footer />
