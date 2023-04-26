<script lang="ts">
    import { page } from '$app/stores';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import BookRoleView from '$lib/bookrole/component/BookRoleView.svelte';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    let bookRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
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
    globalRoles.subscribe((data) => {
        roles = data;
    });

    onMount(async () => {
        try {
            bookRole = await bookRoleController.getBookRole(bookRoleId);
        } catch (error) {
            console.error(error);
            alert(error);
        }
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
        {#if roles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/book-role/update/{bookRole.id}">
                    <button>Update book role</button>
                </a>
            </p>
        {/if}

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
