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
    <a href="/book">Book</a>
    <a href="/book-role">Book role</a>
    <a href="/contributor">Contributor</a>
    <a href="/genre">Genre</a>
    <a href="/movie">Movie</a>
    <a href="/movie-role">Movie role</a>
    <a href="/publishing-house">Publishing house</a>
    <a href="/user">User</a>
    <button on:click={logout}>Logout</button>
</nav>
