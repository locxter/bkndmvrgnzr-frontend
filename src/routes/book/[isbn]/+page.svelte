<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { page } from '$app/stores';

    let isbn: string;

    page.subscribe((data) => {
        isbn = data.params.isbn;
    });
</script>

<svelte:head>
    <title>Book | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Title</h2>
    <h3>Subtitle</h3>
    <p>
        ISBN:
        <br />
        {isbn}
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
        Pages:
        <br />
        Some page count
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
