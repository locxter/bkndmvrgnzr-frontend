<script lang="ts">
    import type { RoleResponseDto } from '../api/role-response-dto';
    import RoleView from './RoleView.svelte';

    export let roles: RoleResponseDto[] = [];
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
