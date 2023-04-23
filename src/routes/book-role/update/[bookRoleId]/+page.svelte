<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { BookRoleUpdateDto } from '$lib/bookrole/api/book-role-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import BookRoleUpdate from '$lib/bookrole/component/BookRoleUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';

    let bookRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRole: BookRoleResponseDto;
    let bookRoleUpdate: BookRoleUpdateDto;

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
            bookRole = await bookRoleController.getBookRole(bookRoleId);
            bookRoleUpdate = bookRole as BookRoleUpdateDto;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateBookRole() {
        try {
            bookRole = await bookRoleController.updateBookRole(bookRole.id, bookRoleUpdate);
            alert('Book role successfully updated');
            goto('/book-role/' + bookRole.id);
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
            <a href="/book-role/{bookRole.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book role not found</h2>
    {/if}
</main>
<Footer />
