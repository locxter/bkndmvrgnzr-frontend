<script lang="ts">
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    let serverAddress: string;
    let jwt: string;
    let roles: ERole[] = [];
    let bookRoleController: BookRoleController;
    let bookRoles: BookRoleResponseDto[] = [];

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
            bookRoles = await bookRoleController.getAllBookRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });
</script>

<svelte:head>
    <title>Book role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Book role</h2>
    <BookRoleSearch {bookRoleController} bind:bookRoles />
    <BookRoleList {bookRoles} />
    {#if roles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/book-role/create">
                <button>Create book role</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
