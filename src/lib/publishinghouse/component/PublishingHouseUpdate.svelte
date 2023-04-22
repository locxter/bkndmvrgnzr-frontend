<script lang="ts">
    import { PublishingHouseUpdateDto } from '../api/publishing-house-update-dto';

    export let publishingHouseUpdate: PublishingHouseUpdateDto = new PublishingHouseUpdateDto();
</script>

<p>
    Name:
    <br />
    <input type="text" placeholder="Name" bind:value={publishingHouseUpdate.name} />
</p>
<p>
    City:
    <br />
    <input type="text" placeholder="City" bind:value={publishingHouseUpdate.city} />
</p>
<p>
    Country:
    <br />
    <input type="text" placeholder="Country" bind:value={publishingHouseUpdate.country} />
</p>
