<script lang="ts">
    import { PublishingHouse } from '../db/publishing-house';

    export let publishingHouseCreate: PublishingHouse = new PublishingHouse();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={publishingHouseCreate.name} />
</p>
<p>
    City:
    <br />
    <input type="text" placeholder="City" bind:value={publishingHouseCreate.city} />
</p>
<p>
    Country:
    <br />
    <input type="text" placeholder="Country" bind:value={publishingHouseCreate.country} />
</p>
<p>* Required</p>
