<script lang="ts">
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import UserView from '$lib/user/component/UserView.svelte';
    import type { User } from '$lib/user/db/user';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let user: User;

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
</script>

<svelte:head>
    {#if user}
        <title>{user.username} | bkndmvrgnzr</title>
    {:else}
        <title>User not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if user}
        <UserView {user} />
        <p>
            <a href="/user/update">
                <button>Update user</button>
            </a>
        </p>
    {:else}
        <h2>User not found</h2>
    {/if}
</main>
<Footer />
