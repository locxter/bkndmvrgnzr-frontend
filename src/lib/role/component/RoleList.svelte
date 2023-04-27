<script lang="ts">
    import type { Role } from '../db/role';
    import RoleView from './RoleView.svelte';

    export let roles: Role[] = [];
</script>

<ul>
    {#each roles as role}
        <li>
            <slot {role} />
            <RoleView {role} />
        </li>
    {:else}
        <li>No roles</li>
    {/each}
</ul>
