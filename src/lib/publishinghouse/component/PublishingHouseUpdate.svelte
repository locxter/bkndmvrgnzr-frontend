<script lang="ts">
    import { PublishingHouse } from '../db/publishing-house';

    export let publishingHouseUpdate: PublishingHouse = new PublishingHouse();
</script>

<p>
    Name*:
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
<p>* Required</p>
