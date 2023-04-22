<script lang="ts">
    import { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';

    export let publishingHouse: PublishingHouseResponseDto = new PublishingHouseResponseDto();
</script>

<a href="/publishing-house/{publishingHouse.id}">
    {publishingHouse.name}
    {#if publishingHouse.city && publishingHouse.country}
        ({publishingHouse.city}, {publishingHouse.country})
    {/if}
</a>
