<script lang="ts">
    import type { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import type { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { Contributor } from '../db/contributor';
    import ContributorBookRoleSelect from './ContributorBookRoleSelect.svelte';
    import ContributorMovieRoleSelect from './ContributorMovieRoleSelect.svelte';

    export let contributor: Contributor = new Contributor();
    export let contributorBookRoles: BookRole[] = [];
    export let contributorMovieRoles: MovieRole[] = [];
    export let bookRoleController: BookRoleController;
    export let movieRoleController: MovieRoleController;
</script>

<p>
    First name*:
    <br />
    <input type="text" placeholder="First name" bind:value={contributor.firstName} />
</p>
<p>
    Last name*:
    <br />
    <input type="text" placeholder="Last name" bind:value={contributor.lastName} />
</p>
<p>
    Birth year:
    <br />
    <input type="number" min="0" placeholder="Birth year" bind:value={contributor.birthYear} />
</p>
<p>
    Birth month:
    <br />
    <input type="number" min="0" placeholder="Birth month" bind:value={contributor.birthMonth} />
</p>
<p>
    Birth day:
    <br />
    <input type="number" min="0" placeholder="Birth day" bind:value={contributor.birthDay} />
</p>
<p>Book roles:</p>
<ContributorBookRoleSelect bind:contributorBookRoles {bookRoleController} />
<p>Movie roles:</p>
<ContributorMovieRoleSelect bind:contributorMovieRoles {movieRoleController} />
<p>* Required</p>
