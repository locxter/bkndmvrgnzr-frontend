<script lang="ts">
    import type { User } from '../db/user';

    export let user: User;
</script>

<a href="/user/{user.id.value}">
    {user.username}
    {#if user.firstName && user.lastName}
        ({user.lastName}, {user.firstName})
    {/if}
</a>
