<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { BookRoleCreateDto } from '$lib/bookrole/api/book-role-create-dto';
    import BookRoleAdd from '$lib/bookrole/component/BookRoleAdd.svelte';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import { goto } from '$app/navigation';

    let serverAddress: string;
    let jwt: string;
    let bookRoleController: BookRoleController;
    let bookRole: BookRoleCreateDto = new BookRoleCreateDto();

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;

        bookRoleController = new BookRoleController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        bookRoleController = new BookRoleController(serverAddress, jwt);
    });

    function createBookRole() {
        bookRoleController
            .createBookRole(bookRole)
            .then((data) => {
                console.log(data);
                alert('Book role successfully added');
                goto('/book-role/' + data.id);
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
    <h2>Add book role</h2>
    <BookRoleAdd {bookRole} />
    <p>
        <button on:click={createBookRole}>Create book role</button>
    </p>
</main>
<Footer />
