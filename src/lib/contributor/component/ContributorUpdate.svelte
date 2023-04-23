<script lang="ts">
    import type { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import type { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import MovieRoleSearch from '$lib/movierole/component/MovieRoleSearch.svelte';
    import { onMount } from 'svelte';
    import { ContributorUpdateDto } from '../api/contributor-update-dto';

    export let contributorUpdate: ContributorUpdateDto = new ContributorUpdateDto();
    export let contributorUpdateBookRoles: BookRoleResponseDto[] = [];
    export let contributorUpdateMovieRoles: MovieRoleResponseDto[] = [];
    export let bookRoleController: BookRoleController;
    export let movieRoleController: MovieRoleController;

    let bookRoles: BookRoleResponseDto[];
    let movieRoles: MovieRoleResponseDto[];

    onMount(async () => {
        try {
            bookRoles = await bookRoleController.getAllBookRoles();
            movieRoles = await movieRoleController.getAllMovieRoles();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleBookRole(bookRole: BookRoleResponseDto) {
        if (contributorUpdateBookRoles.map((it) => it.id).includes(bookRole.id)) {
            contributorUpdateBookRoles.splice(contributorUpdateBookRoles.map((it) => it.id).indexOf(bookRole.id), 1);
            contributorUpdateBookRoles = contributorUpdateBookRoles;
        } else {
            contributorUpdateBookRoles = [...contributorUpdateBookRoles, bookRole];
        }
    }

    function toggleMovieRole(movieRole: MovieRoleResponseDto) {
        if (contributorUpdateMovieRoles.map((it) => it.id).includes(movieRole.id)) {
            contributorUpdateMovieRoles.splice(contributorUpdateMovieRoles.map((it) => it.id).indexOf(movieRole.id), 1);
            contributorUpdateMovieRoles = contributorUpdateMovieRoles;
        } else {
            contributorUpdateMovieRoles = [...contributorUpdateMovieRoles, movieRole];
        }
    }
</script>

<p>
    First name:
    <br />
    <input type="text" placeholder="First name" bind:value={contributorUpdate.firstName} />
</p>
<p>
    Last name:
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
        {#if contributorUpdateBookRoles.map((it) => it.id).includes(bookRole.id)}
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
        {#if contributorUpdateMovieRoles.map((it) => it.id).includes(movieRole.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieRoleList>
<p>{contributorUpdateMovieRoles.length} movie roles selected</p>
