<script lang="ts">
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookList from '$lib/book/component/BookList.svelte';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';

    export let publishingHouse: PublishingHouseResponseDto = new PublishingHouseResponseDto();

    $: books = publishingHouse.books as BookResponseDto[];
</script>

<h2>{publishingHouse.name}</h2>
<p>
    City:
    <br />
    {publishingHouse.city}
</p>
<p>
    Country:
    <br />
    {publishingHouse.country}
</p>
<p>Books:</p>
<BookList {books} />
