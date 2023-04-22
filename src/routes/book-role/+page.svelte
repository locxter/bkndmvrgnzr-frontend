<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';

    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRoles: BookRoleResponseDto[];

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
            .getAllBookRoles()
            .then((data) => {
                bookRoles = data;
            })
            .catch((error) => {
                console.error(error);
            });
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
    <p>
        <a href="/book-role/create">
            <button>Create book role</button>
        </a>
    </p>
</main>
<Footer />
