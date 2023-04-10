<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Footer from '../../components/Footer.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Add movie</h2>
</main>
<Footer />
