<script lang="ts">
    import type { BookController } from '$lib/book/api/book-controller';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import type { MovieController } from '$lib/movie/api/movie-controller';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import type { MovieRoleBrief } from '$lib/movierole/db/movie-role-brief';
    import type { Contributor } from '../db/contributor';
    import ContributorBookList from './ContributorBookList.svelte';
    import ContributorMovieList from './ContributorMovieList.svelte';

    export let contributor: Contributor;
    export let bookController: BookController;
    export let movieController: MovieController;

    $: bookRoles = contributor.bookContributors.map((it) => it.bookRole);
    $: movieRoles = contributor.movieContributors.map((it) => it.movieRole);
</script>

<h2>{contributor.lastName}, {contributor.firstName}</h2>
<p>
    Birth year:
    <br />
    {contributor.birthYear}
</p>
<p>
    Birth month:
    <br />
    {contributor.birthMonth}
</p>
<p>
    Birth day:
    <br />
    {contributor.birthDay}
</p>
<p>Book roles:</p>
<BookRoleList {bookRoles} />
<p>Movie roles:</p>
<MovieRoleList {movieRoles} />
<p>Books:</p>
<ContributorBookList {contributor} {bookController} />
<p>Movies:</p>
<ContributorMovieList {contributor} {movieController} />
