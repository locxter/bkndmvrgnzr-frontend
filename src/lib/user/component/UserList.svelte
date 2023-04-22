<script lang="ts">
    import type { UserResponseDto } from '../api/user-response-dto';
    import UserViewBrief from './UserViewBrief.svelte';

    export let users: UserResponseDto[] = [];
</script>

<ul>
    {#each users as user}
        <li><UserViewBrief {user} /></li>
    {:else}
        <li>No users</li>
    {/each}
</ul>
