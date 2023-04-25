<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { UserController } from '$lib/user/api/user-controller';
    import type { UserResponseDto } from '$lib/user/api/user-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import UserList from '$lib/user/component/UserList.svelte';
    import UserSearch from '$lib/user/component/UserSearch.svelte';
    import UserView from '$lib/user/component/UserView.svelte';
    import { page } from '$app/stores';

    let userId: string;
    let serverAddress: string;
    let jwt: string;
    let userController: UserController;
    let user: UserResponseDto;

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
            <a href="/user/update/{user.id}">
                <button>Update user</button>
            </a>
        </p>
        <p>
            <a href="/user/search">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>User not found</h2>
    {/if}
</main>
<Footer />
