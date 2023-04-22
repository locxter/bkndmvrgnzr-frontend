<script lang="ts">
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookList from '$lib/book/component/BookList.svelte';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import MovieList from '$lib/movie/component/MovieList.svelte';
    import { ContributorResponseDto } from '../api/contributor-response-dto';

    export let contributor: ContributorResponseDto = new ContributorResponseDto();
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
<p>Books:</p>
<ul>
    {#each contributor.bookContributors as bookContributor}
        <li>
            <a href="">
                {bookContributor.bookRole.name}: FIND BOOK
            </a>
        </li>
    {:else}
        <li>No books</li>
    {/each}
</ul>
<p>Movies:</p>
<ul>
    {#each contributor.movieContributors as movieContributor}
        <li>
            <a href="">
                {movieContributor.movieRole.name}: FIND MOVIE
            </a>
        </li>
    {:else}
        <li>No books</li>
    {/each}
</ul>
