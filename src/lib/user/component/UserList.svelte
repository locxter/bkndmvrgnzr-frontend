<script lang="ts">
    import type { User } from '../db/user';
    import UserViewBrief from './UserViewBrief.svelte';

    export let users: User[] = [];
</script>

<ul>
    {#each users as user}
        <li><UserViewBrief {user} /></li>
    {:else}
        <li>No users</li>
    {/each}
</ul>
