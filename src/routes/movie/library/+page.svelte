<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';

    import BookSearch from '../../../components/BookSearch.svelte';
    import BookList from '../../../lib/book/component/BookList.svelte';
    import MovieSearch from '../../../components/MovieSearch.svelte';
    import MovieList from '../../../lib/movie/component/MovieList.svelte';
    import type { PageData } from '../library/$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Library | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Library</h2>
    <h3>Books</h3>
    <BookSearch />
    <BookList />
    <h3>Movies</h3>
    <MovieSearch />
    <MovieList />
</main>
<Footer />
