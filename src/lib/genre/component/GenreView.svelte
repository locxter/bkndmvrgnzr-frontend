<script lang="ts">
    import BookList from '$lib/book/component/BookList.svelte';
    import type { BookBrief } from '$lib/book/db/book-brief';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import type { MovieBrief } from '$lib/movie/db/movie-brief';
    import type { Genre } from '../db/genre';

    export let genre: Genre;

    $: books = genre.books;
    $: movies = genre.movies;
</script>

<h2>{genre.name}</h2>
<p>Books:</p>
<BookList {books} />
<p>Movies:</p>
<MovieList {movies} />
