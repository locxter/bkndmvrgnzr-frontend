<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import BookList from '../../lib/book/component/BookList.svelte';
    import BookSearch from '$lib/book/component/BookSearch.svelte';
</script>

<svelte:head>
    <title>Book search | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Book search</h2>
    <BookSearch />
    <BookList />
</main>
<Footer />
