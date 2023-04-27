<script lang="ts">
    import type { BookController } from '$lib/book/api/book-controller';
    import BookViewBrief from '$lib/book/component/BookViewBrief.svelte';
    import type { Book } from '$lib/book/db/book';
    import BookRoleList from '$lib/bookrole/component/BookRoleList.svelte';
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import type { MovieController } from '$lib/movie/api/movie-controller';
    import MovieViewBrief from '$lib/movie/component/MovieViewBrief.svelte';
    import type { Movie } from '$lib/movie/db/movie';
    import MovieRoleList from '$lib/movierole/component/MovieRoleList.svelte';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';
    import type { MovieRoleBrief } from '$lib/movierole/db/movie-role-brief';
    import { Contributor } from '../db/contributor';

    export let contributor: Contributor = new Contributor();
    export let bookController: BookController;
    export let movieController: MovieController;

    let bookRoles: BookRoleBrief[] = [];
    let movieRoles: MovieRoleBrief[] = [];
    let bookRolesBooks: { bookRole: BookRoleBrief; books: Book[] }[] = [];
    let movieRolesMovies: { movieRole: MovieRoleBrief; movies: Movie[] }[] = [];

    $: bookRoles = contributor.bookContributors.map((it) => it.bookRole);
    $: movieRoles = contributor.movieContributors.map((it) => it.movieRole);
    $: loadIndirectData(contributor);

    async function loadIndirectData(contributor: Contributor) {
        try {
            bookRolesBooks = [];
            movieRolesMovies = [];
            for (let bookContributor of contributor.bookContributors) {
                let data = await bookController.getAllBooksOfBookContributor(bookContributor.id);
                if (data.length) {
                    bookRolesBooks = [
                        ...bookRolesBooks,
                        {
                            bookRole: bookContributor.bookRole,
                            books: data,
                        },
                    ];
                }
            }
            for (let movieContributor of contributor.movieContributors) {
                let data = await movieController.getAllMoviesOfMovieContributor(movieContributor.id);
                if (data.length) {
                    movieRolesMovies = [
                        ...movieRolesMovies,
                        {
                            movieRole: movieContributor.movieRole,
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
