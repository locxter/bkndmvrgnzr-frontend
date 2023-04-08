<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Title</h2>
    <p>
        ISAN:
        <br />
        Some ISAN
    </p>
    <p>
        Description:
        <br />
        Some description
    </p>
    <p>
        Year:
        <br />
        Some year
    </p>
    <p>
        Play time:
        <br />
        Some play time
    </p>
    <p>
        Age restriction:
        <br />
        Some age restriction
    </p>
    <p>Contributors</p>
    <ul>
        <li>
            <a href="">Role</a>
            :
            <a href="">Last name, first name</a>
        </li>
        <li>
            <a href="">Role</a>
            :
            <a href="">Last name, first name</a>
        </li>
        <li>
            <a href="">Role</a>
            :
            <a href="">Last name, first name</a>
        </li>
        <li>
            <a href="">Role</a>
            :
            <a href="">Last name, first name</a>
        </li>
        <li>
            <a href="">Role</a>
            :
            <a href="">Last name, first name</a>
        </li>
    </ul>
</main>
<Footer />
