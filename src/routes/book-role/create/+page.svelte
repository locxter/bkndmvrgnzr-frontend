<script lang="ts">
    import { goto } from '$app/navigation';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleCreate from '$lib/bookrole/component/BookRoleCreate.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRoleCreate: BookRole;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookRoleController = new BookRoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookRoleController = new BookRoleController(serverAddress, jwt);
    });

    async function createBookRole() {
        try {
            let data = await bookRoleController.createBookRole(bookRoleCreate);
            alert('Book role successfully created');
            goto('/book-role/' + data.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create book role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create book role</h2>
    <BookRoleCreate bind:bookRoleCreate />
    <p>
        <button on:click={createBookRole}>Create book role</button>
    </p>
    <p>
        <a href="/book-role">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
