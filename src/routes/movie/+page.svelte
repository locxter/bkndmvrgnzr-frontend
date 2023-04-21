<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import MovieList from '../../lib/movie/component/MovieList.svelte';
    import MovieSearch from '$lib/movie/component/MovieSearch.svelte';
</script>

<svelte:head>
    <title>Movie search | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Movie search</h2>
    <MovieSearch />
    <MovieList />
</main>
<Footer />
