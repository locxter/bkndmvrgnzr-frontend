<script lang="ts">
    import type { ContributorBrief } from '../db/contributor-brief';
    import ContributorViewBrief from './ContributorViewBrief.svelte';

    export let contributors: ContributorBrief[] = [];
</script>

<ul>
    {#each contributors as contributor}
        <li><ContributorViewBrief {contributor} /></li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
