<script lang="ts">
    import type { BookController } from '$lib/book/api/book-controller';
    import type { BookResponseDto } from '$lib/book/api/book-response-dto';
    import BookViewBrief from '$lib/book/component/BookViewBrief.svelte';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import type { MovieController } from '$lib/movie/api/movie-controller';
    import type { MovieResponseDto } from '$lib/movie/api/movie-response-dto';
    import { onMount } from 'svelte';
    import { ContributorResponseDto } from '../api/contributor-response-dto';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import MovieViewBrief from '$lib/movie/component/MovieViewBrief.svelte';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';

    export let contributor: ContributorResponseDto = new ContributorResponseDto();
    export let bookController: BookController;
    export let movieController: MovieController;

    let bookRolesBooks: { bookRole: BookRoleResponseDto; books: BookResponseDto[] }[] = [];
    let movieRolesMovies: { movieRole: MovieRoleResponseDto; movies: MovieResponseDto[] }[] = [];

    onMount(() => {
        for (let bookContributor of contributor.bookContributors) {
            bookController
                .getAllBooksOfBookContributor(bookContributor.id)
                .then((data) => {
                    bookRolesBooks[bookRolesBooks.length] = {
                        bookRole: bookContributor.bookRole as BookRoleResponseDto,
                        books: data,
                    };
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
        for (let movieContributor of contributor.movieContributors) {
            movieController
                .getAllMoviesOfMovieContributor(movieContributor.id)
                .then((data) => {
                    movieRolesMovies[movieRolesMovies.length] = {
                        movieRole: movieContributor.movieRole as MovieRoleResponseDto,
                        movies: data,
                    };
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    });
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
    {#each bookRolesBooks as bookRoleBooks}
        {#each bookRoleBooks.books as bookRoleBook}
            <li>
                <BookRoleViewBrief bookRole={bookRoleBooks.bookRole} />
                :
                <BookViewBrief book={bookRoleBook} />
            </li>
        {/each}
    {:else}
        <li>No books</li>
    {/each}
</ul>
<p>Movies:</p>
<ul>
    {#each movieRolesMovies as movieRoleMovies}
        {#each movieRoleMovies.movies as movieRoleMovie}
            <li>
                <MovieRoleViewBrief movieRole={movieRoleMovies.movieRole} />
                :
                <MovieViewBrief movie={movieRoleMovie} />
            </li>
        {/each}
    {:else}
        <li>No movies</li>
    {/each}
</ul>
