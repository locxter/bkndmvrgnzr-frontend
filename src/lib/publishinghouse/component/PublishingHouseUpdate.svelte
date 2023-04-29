<script lang="ts">
    import type { PublishingHouse } from '../db/publishing-house';

    export let publishingHouse: PublishingHouse;
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={publishingHouse.name} />
</p>
<p>
    City:
    <br />
    <input type="text" placeholder="City" bind:value={publishingHouse.city} />
</p>
<p>
    Country:
    <br />
    <input type="text" placeholder="Country" bind:value={publishingHouse.country} />
</p>
<p>* Required</p>
