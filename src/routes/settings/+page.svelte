<script lang="ts">
    import Header from '../../components/Header.svelte';
    import Navigation from '../../components/Navigation.svelte';
    import Footer from '../../components/Footer.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>Settings | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Settings</h2>
    <p>
        <label for="username">Username:</label>
        <br />
        <input id="username" type="text" placeholder="Username" />
    </p>
    <p>
        <label for="first-name">First name:</label>
        <br />
        <input id="first-name" type="text" placeholder="First name" />
    </p>
    <p>
        <label for="last-name">Last name:</label>
        <br />
        <input id="last-name" type="text" placeholder="Last name" />
    </p>
    <p>
        <label for="password">Password:</label>
        <br />
        <input id="password" type="password" placeholder="Password" />
    </p>
    <p>
        <button>Save settings</button>
    </p>
    <h3>Danger zone</h3>
    <p>
        <label for="username">Username:</label>
        <br />
        <input id="username" type="text" placeholder="Username" />
    </p>
    <p>
        <label for="password">Password:</label>
        <br />
        <input id="password" type="password" placeholder="Password" />
    </p>
    <p>
        <label for="confirm-password">Confirm password:</label>
        <br />
        <input id="confirm-password" type="password" placeholder="Confirm password" />
    </p>
    <p>
        <button>
            <strong>Delete this account</strong>
        </button>
    </p>
</main>
<Footer />
