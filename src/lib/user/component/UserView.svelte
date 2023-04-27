<script lang="ts">
    import BookList from '$lib/book/component/BookList.svelte';
    import type { BookBrief } from '$lib/book/db/book-brief';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import type { MovieBrief } from '$lib/movie/db/movie-brief';
    import RoleList from '$lib/role/component/RoleList.svelte';
    import { User } from '../db/user';

    export let user: User = new User();

    let books: BookBrief[] = [];
    let movies: MovieBrief[] = [];

    $: books = user.books;
    $: movies = user.movies;
</script>

<h2>{user.username}</h2>
{#if user.firstName && user.lastName}
    <h3>{user.lastName}, {user.firstName}</h3>
{/if}
<p>Roles:</p>
<RoleList roles={user.roles} />
<p>Books:</p>
<BookList {books} />
<p>Movies:</p>
<MovieList {movies} />
