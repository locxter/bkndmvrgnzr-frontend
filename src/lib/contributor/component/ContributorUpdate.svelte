<script lang="ts">
    import { ContributorUpdateDto } from '../api/contributor-update-dto';

    export let contributorUpdate: ContributorUpdateDto = new ContributorUpdateDto();
</script>

<p>
    First name:
    <br />
    <input type="text" placeholder="First name" bind:value={contributorUpdate.firstName} />
</p>
<p>
    Last name:
    <br />
    <input type="text" placeholder="Last name" bind:value={contributorUpdate.lastName} />
</p>
<p>
    Birth year:
    <br />
    <input type="number" min="0" placeholder="Birth year" bind:value={contributorUpdate.birthYear} />
</p>
<p>
    Birth month:
    <br />
    <input type="number" min="0" placeholder="Birth month" bind:value={contributorUpdate.birthMonth} />
</p>
<p>
    Birth day:
    <br />
    <input type="number" min="0" placeholder="Birth day" bind:value={contributorUpdate.birthDay} />
</p>
