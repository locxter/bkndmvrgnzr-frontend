<script lang="ts">
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import { onMount } from 'svelte';
    import { ContributorCreateDto } from '../api/contributor-create-dto';
    import type { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import BookRoleSearch from '$lib/bookrole/component/BookRoleSearch.svelte';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import type { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import MovieRoleSearch from '$lib/movierole/component/MovieRoleSearch.svelte';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';

    export let contributorCreate: ContributorCreateDto = new ContributorCreateDto();
    export let contributorBookRoles: BookRoleResponseDto[] = [];
    export let contributorMovieRoles: MovieRoleResponseDto[] = [];
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
        if (contributorBookRoles.map((it) => it.id).includes(bookRole.id)) {
            contributorBookRoles.splice(contributorBookRoles.map((it) => it.id).indexOf(bookRole.id), 1);
            contributorBookRoles = contributorBookRoles;
        } else {
            contributorBookRoles = [...contributorBookRoles, bookRole];
        }
    }

    function toggleMovieRole(movieRole: MovieRoleResponseDto) {
        if (contributorMovieRoles.map((it) => it.id).includes(movieRole.id)) {
            contributorMovieRoles.splice(contributorMovieRoles.map((it) => it.id).indexOf(movieRole.id), 1);
            contributorMovieRoles = contributorMovieRoles;
        } else {
            contributorMovieRoles = [...contributorMovieRoles, movieRole];
        }
    }
</script>

<p>
    First name:
    <br />
    <input type="text" placeholder="First name" bind:value={contributorCreate.firstName} />
</p>
<p>
    Last name:
    <br />
    <input type="text" placeholder="Last name" bind:value={contributorCreate.lastName} />
</p>
<p>
    Birth year:
    <br />
    <input type="number" min="0" placeholder="Birth year" bind:value={contributorCreate.birthYear} />
</p>
<p>
    Birth month:
    <br />
    <input type="number" min="0" placeholder="Birth month" bind:value={contributorCreate.birthMonth} />
</p>
<p>
    Birth day:
    <br />
    <input type="number" min="0" placeholder="Birth day" bind:value={contributorCreate.birthDay} />
</p>
<p>Book roles:</p>
<BookRoleSearch bind:bookRoles {bookRoleController} />
<BookRoleList {bookRoles} let:bookRole>
    <button on:click={() => toggleBookRole(bookRole)}>
        {#if contributorBookRoles.map((it) => it.id).includes(bookRole.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookRoleList>
<p>{contributorBookRoles.length} book roles selected</p>
<p>Movie roles:</p>
<MovieRoleSearch bind:movieRoles {movieRoleController} />
<MovieRoleList {movieRoles} let:movieRole>
    <button on:click={() => toggleMovieRole(movieRole)}>
        {#if contributorMovieRoles.map((it) => it.id).includes(movieRole.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</MovieRoleList>
<p>{contributorMovieRoles.length} movie roles selected</p>
