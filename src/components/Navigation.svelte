<script lang="ts">
    import { goto } from '$app/navigation';
    import { globalJwt } from '$lib/stores';

    function logout() {
        globalJwt.set('');
        goto('/');
    }
</script>

<nav>
    <a href="/welcome">Welcome</a>
    <a href="/search">Search</a>
    <a href="/library">Library</a>
    <a href="/settings">Settings</a>
    <button on:click={logout}>Logout</button>
</nav>
