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
    import BookRoleView from '$lib/bookrole/component/BookRoleView.svelte';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';

    export let contributor: ContributorResponseDto = new ContributorResponseDto();
    export let bookController: BookController;
    export let movieController: MovieController;

    let bookRoles: BookRoleResponseDto[] = [];
    let movieRoles: MovieRoleResponseDto[] = [];
    let bookRolesBooks: { bookRole: BookRoleResponseDto; books: BookResponseDto[] }[] = [];
    let movieRolesMovies: { movieRole: MovieRoleResponseDto; movies: MovieResponseDto[] }[] = [];

    $: loadIndirectData(contributor);

    async function loadIndirectData(contributor: ContributorResponseDto) {
        try {
            bookRoles = [];
            movieRoles = [];
            bookRolesBooks = [];
            movieRolesMovies = [];
            for (let bookContributor of contributor.bookContributors) {
                bookRoles = [...bookRoles, bookContributor.bookRole as BookRoleResponseDto];
                let data = await bookController.getAllBooksOfBookContributor(bookContributor.id);
                if (data.length) {
                    bookRolesBooks = [
                        ...bookRolesBooks,
                        {
                            bookRole: bookContributor.bookRole as BookRoleResponseDto,
                            books: data,
                        },
                    ];
                }
            }
            for (let movieContributor of contributor.movieContributors) {
                movieRoles = [...movieRoles, movieContributor.movieRole as MovieRoleResponseDto];
                let data = await movieController.getAllMoviesOfMovieContributor(movieContributor.id);
                if (data.length) {
                    movieRolesMovies = [
                        ...movieRolesMovies,
                        {
                            movieRole: movieContributor.movieRole as MovieRoleResponseDto,
                            movies: data,
                        },
                    ];
                }
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
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
