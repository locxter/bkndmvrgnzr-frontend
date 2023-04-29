<script lang="ts">
    import { page } from '$app/stores';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleView from '$lib/bookrole/component/BookRoleView.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { BookRoleId } from '$lib/bookrole/db/book-role-id';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: bookRoleController = new BookRoleController($globalServerAddress, $globalJwt);
    let bookRole: BookRole;

    onMount(async () => {
        try {
            bookRole = await bookRoleController.getBookRole(new BookRoleId($page.params.bookRoleId));
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
        {#if $globalRoles.includes(ERole.ROLE_EDITOR)}
            <p>
                <a href="/book-role/update/{bookRole.id.value}">
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
