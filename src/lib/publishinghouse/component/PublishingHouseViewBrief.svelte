<script lang="ts">
    import type { PublishingHouseBrief } from '../db/publishing-house-brief';

    export let publishingHouse: PublishingHouseBrief;
</script>

<a href="/publishing-house/{publishingHouse.id.value}">
    {publishingHouse.name}
    {#if publishingHouse.city && publishingHouse.country}
        ({publishingHouse.city}, {publishingHouse.country})
    {/if}
</a>
