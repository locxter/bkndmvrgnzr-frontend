<script lang="ts">
    import { goto } from '$app/navigation';
    import { ERole } from '$lib/role/db/erole';
    import { globalJwt, globalRoles } from '$lib/stores';

    function logout() {
        globalJwt.set('');
        globalRoles.set([]);
        goto('/');
    }
</script>

<nav>
    <a href="/welcome">Welcome</a>
    <a href="/book">Book</a>
    <a href="/book/library">Book library</a>
    <a href="/book-role">Book role</a>
    <a href="/contributor">Contributor</a>
    <a href="/genre">Genre</a>
    <a href="/movie">Movie</a>
    <a href="/movie/library">Movie library</a>
    <a href="/movie-role">Movie role</a>
    <a href="/publishing-house">Publishing house</a>
    <a href="/user">User</a>
    {#if $globalRoles.includes(ERole.ROLE_ADMIN)}
        <a href="/user/search">User search</a>
    {/if}
    <button on:click={logout}>Logout</button>
</nav>
