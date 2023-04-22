<script lang="ts">
    import type { ContributorResponseDto } from '../api/contributor-response-dto';
    import ContributorViewBrief from './ContributorViewBrief.svelte';

    export let contributors: ContributorResponseDto[] = [];
</script>

<ul>
    {#each contributors as contributor}
        <li><ContributorViewBrief {contributor} /></li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
