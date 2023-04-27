<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleUpdate from '$lib/bookrole/component/BookRoleUpdate.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { BookRoleId } from '$lib/bookrole/db/book-role-id';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let bookRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRole: BookRole;
    let bookRoleUpdate: BookRole;

    page.subscribe((data) => {
        bookRoleId = data.params.bookRoleId;
    });

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        bookRoleController = new BookRoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookRoleController = new BookRoleController(serverAddress, jwt);
    });

    onMount(async () => {
        try {
            bookRole = await bookRoleController.getBookRole(new BookRoleId(bookRoleId));
            bookRoleUpdate = Object.create(bookRole);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateBookRole() {
        try {
            bookRole = await bookRoleController.updateBookRole(bookRole.id, bookRoleUpdate);
            alert('Book role successfully updated');
            goto('/book-role/' + bookRole.id.value);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteBookRole() {
        try {
            await bookRoleController.deleteBookRole(bookRole.id);
            alert('Book role successfully deleted');
            goto('/book-role');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update book role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if bookRole}
        <h2>Update book role</h2>
        <BookRoleUpdate bind:bookRoleUpdate />
        <p>
            <button on:click={updateBookRole}>Update book role</button>
        </p>
        <p>
            <button on:click={deleteBookRole}>Delete book role</button>
        </p>
        <p>
            <a href="/book-role/{bookRole.id.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book role not found</h2>
    {/if}
</main>
<Footer />
