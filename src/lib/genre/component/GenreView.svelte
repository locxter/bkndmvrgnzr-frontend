<script lang="ts">
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookList from '$lib/book/component/BookList.svelte';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import { GenreResponseDto } from '../api/genre-response-dto';

    export let genre: GenreResponseDto = new GenreResponseDto();

    $: books = genre.books as BookResponseDto[];
    $: movies = genre.movies as MovieResponseDto[];
</script>

<h2>{genre.name}</h2>
<p>Books:</p>
<BookList {books} />
<p>Movies:</p>
<MovieList {movies} />
