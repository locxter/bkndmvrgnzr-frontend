<script lang="ts">
    import { page } from '$app/stores';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import UserView from '$lib/user/component/UserView.svelte';
    import type { User } from '$lib/user/db/user';
    import { UserId } from '$lib/user/db/user-id';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: userController = new UserController($globalServerAddress, $globalJwt);
    let user: User;

    onMount(async () => {
        try {
            user = await userController.getSpecificUser(new UserId($page.params.userId));
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
            <a href="/user/update/{user.id.value}">
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
