<script lang="ts">
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../components/Footer.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';

    $: bookRoleController = new BookRoleController($globalServerAddress, $globalJwt);
    let bookRoles: BookRole[] = [];

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
    {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
        <p>
            <a href="/book-role/create">
                <button>Create book role</button>
            </a>
        </p>
    {/if}
</main>
<Footer />
