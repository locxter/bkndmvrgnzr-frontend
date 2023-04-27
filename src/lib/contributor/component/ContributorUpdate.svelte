<script lang="ts">
    import type { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import type { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import MovieRoleSearch from '$lib/movierole/component/MovieRoleSearch.svelte';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import type { MovieRoleBrief } from '$lib/movierole/db/movie-role-brief';
    import { onMount } from 'svelte';
    import { Contributor } from '../db/contributor';

    export let contributorUpdate: Contributor = new Contributor();
    export let contributorUpdateBookRoles: BookRole[] = [];
    export let contributorUpdateMovieRoles: MovieRole[] = [];
    export let bookRoleController: BookRoleController;
    export let movieRoleController: MovieRoleController;

    let bookRoles: BookRole[] = [];
    let movieRoles: MovieRole[] = [];

    onMount(async () => {
        try {
            bookRoles = await bookRoleController.getAllBookRoles();
            movieRoles = await movieRoleController.getAllMovieRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleBookRole(bookRole: BookRoleBrief) {
        if (contributorUpdateBookRoles.map((it) => it.id.value).includes(bookRole.id.value)) {
            contributorUpdateBookRoles.splice(
                contributorUpdateBookRoles.map((it) => it.id.value).indexOf(bookRole.id.value),
                1
            );
            contributorUpdateBookRoles = contributorUpdateBookRoles;
        } else {
            contributorUpdateBookRoles = [...contributorUpdateBookRoles, bookRole as BookRole];
        }
    }

    function toggleMovieRole(movieRole: MovieRoleBrief) {
        if (contributorUpdateMovieRoles.map((it) => it.id.value).includes(movieRole.id.value)) {
            contributorUpdateMovieRoles.splice(
                contributorUpdateMovieRoles.map((it) => it.id.value).indexOf(movieRole.id.value),
                1
            );
            contributorUpdateMovieRoles = contributorUpdateMovieRoles;
        } else {
            contributorUpdateMovieRoles = [...contributorUpdateMovieRoles, movieRole as MovieRole];
        }
    }
</script>

<p>
    First name*:
    <br />
    <input type="text" placeholder="First name" bind:value={contributorUpdate.firstName} />
</p>
<p>
    Last name*:
    <br />
    <input type="text" placeholder="Last name" bind:value={contributorUpdate.lastName} />
</p>
<p>
    Birth year:
    <br />
    <input type="number" min="0" placeholder="Birth year" bind:value={contributorUpdate.birthYear} />
</p>
<p>
    Birth month:
    <br />
    <input type="number" min="0" placeholder="Birth month" bind:value={contributorUpdate.birthMonth} />
</p>
<p>
    Birth day:
    <br />
    <input type="number" min="0" placeholder="Birth day" bind:value={contributorUpdate.birthDay} />
</p>
<p>Book roles:</p>
<BookRoleSearch bind:bookRoles {bookRoleController} />
<BookRoleList {bookRoles} let:bookRole>
    <button on:click={() => toggleBookRole(bookRole)}>
        {#if contributorUpdateBookRoles.map((it) => it.id.value).includes(bookRole.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookRoleList>
<p>{contributorUpdateBookRoles.length} book roles selected</p>
<p>Movie roles:</p>
<MovieRoleSearch bind:movieRoles {movieRoleController} />
<MovieRoleList {movieRoles} let:movieRole>
    <button on:click={() => toggleMovieRole(movieRole)}>
        {#if contributorUpdateMovieRoles.map((it) => it.id.value).includes(movieRole.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieRoleList>
<p>{contributorUpdateMovieRoles.length} movie roles selected</p>
<p>* Required</p>
