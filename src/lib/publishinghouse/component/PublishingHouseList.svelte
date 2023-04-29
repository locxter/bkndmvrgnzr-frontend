<script lang="ts">
    import type { PublishingHouseBrief } from '../db/publishing-house-brief';
    import PublishingHouseViewBrief from './PublishingHouseViewBrief.svelte';

    export let publishingHouses: PublishingHouseBrief[];
</script>

<ul>
    {#each publishingHouses as publishingHouse}
        <li>
            <slot {publishingHouse} />
            <PublishingHouseViewBrief {publishingHouse} />
        </li>
    {:else}
        <li>No publishing houses</li>
    {/each}
</ul>
