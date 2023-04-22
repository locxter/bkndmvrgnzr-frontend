<script lang="ts">
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookList from '$lib/book/component/BookList.svelte';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import RoleList from '$lib/role/component/RoleList.svelte';
    import { UserResponseDto } from '../api/user-response-dto';

    export let user: UserResponseDto = new UserResponseDto();

    let books = user.books as BookResponseDto[];
    let movies = user.movies as MovieResponseDto[];
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
