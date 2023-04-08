<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import BookSearch from '../../components/BookSearch.svelte';
    import BookList from '../../components/BookList.svelte';
    import MovieSearch from '../../components/MovieSearch.svelte';
    import MovieList from '../../components/MovieList.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Search</h2>
    <h3>Books</h3>
    <BookSearch />
    <BookList />
    <h3>Movies</h3>
    <MovieSearch />
    <MovieList />
</main>
<Footer />
