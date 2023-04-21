<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { BookRoleCreateDto } from '$lib/bookrole/api/book-role-create-dto';
    import BookRoleAdd from '$lib/bookrole/component/BookRoleAdd.svelte';
    import type { BookRoleUpdateDto } from '$lib/bookrole/api/book-role-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import BookRoleEdit from '$lib/bookrole/component/BookRoleEdit.svelte';
    import { goto } from '$app/navigation';

    let bookRoleId: string;
    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRole: BookRoleUpdateDto;

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
            });
    });

    function updateBookRole() {
        bookRoleController
            .updateBookRole(bookRoleId, bookRole)
            .then((data) => {
                console.log(data);
                alert('Book role successfully updated');
                goto('/book-role/' + bookRoleId);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function deleteBookRole() {
        bookRoleController
            .deleteBookRole(bookRoleId)
            .then((data) => {
                console.log(data);
                alert('Book role successfully deleted');
                goto('/book-role');
            })
            .catch((error) => {
                console.error(error);
            });
    }
</script>

<svelte:head>
    <title>Book role | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Edit book role</h2>
    <BookRoleEdit {bookRole} />
    <p>
        <button on:click={updateBookRole}>Update book role</button>
    </p>
    <p>
        <button on:click={deleteBookRole}>Delete book role</button>
    </p>
</main>
<Footer />
