<script lang="ts">
    import type { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';
    import PublishingHouseViewBrief from './PublishingHouseViewBrief.svelte';

    export let publishingHouses: PublishingHouseResponseDto[] = [];
</script>

<ul>
    {#each publishingHouses as publishingHouse}
        <li><PublishingHouseViewBrief {publishingHouse} /></li>
    {:else}
        <li>No book roles</li>
    {/each}
</ul>
