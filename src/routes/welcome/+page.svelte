<script lang="ts">
    import BookList from '../../components/BookList.svelte';
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import MovieList from '../../components/MovieList.svelte';
</script>

<svelte:head>
    <title>Welcome</title>
    <meta name="description" content="About this app" />
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Welcome nobody</h2>
    <h3>Books</h3>
    <BookList />
    <a href="">View more</a>
    <h3>Movies</h3>
    <MovieList />
    <a href="">View more</a>
</main>
<Footer />
