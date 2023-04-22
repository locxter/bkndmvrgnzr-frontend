<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';
    import BookRoleView from '$lib/bookrole/component/BookRoleView.svelte';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { onMount } from 'svelte';

    let bookRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRole: BookRoleResponseDto;

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

    onMount(() => {
        bookRoleController
            .getBookRole(bookRoleId)
            .then((data) => {
                bookRole = data;
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    });
</script>

<svelte:head>
    {#if bookRole}
        <title>{bookRole.name} | bkndmvrgnzr</title>
    {:else}
        <title>Book role not found | bkndmvrgnzr</title>
    {/if}
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if bookRole}
        <BookRoleView {bookRole} />
        <p>
            <a href="/book-role/update/{bookRole.id}">
                <button>Update book role</button>
            </a>
        </p>
        <p>
            <a href="/book-role">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Book role not found</h2>
    {/if}
</main>
<Footer />
