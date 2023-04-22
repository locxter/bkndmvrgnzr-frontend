<script lang="ts">
    import type { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';
    import PublishingHouseViewBrief from './PublishingHouseViewBrief.svelte';

    export let publishingHouses: PublishingHouseResponseDto[] = [];
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
