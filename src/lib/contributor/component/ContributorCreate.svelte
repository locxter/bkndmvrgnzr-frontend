<script lang="ts">
    import { ContributorCreateDto } from '../api/contributor-create-dto';

    export let contributorCreate: ContributorCreateDto = new ContributorCreateDto();
</script>

<p>
    First name:
    <br />
    <input type="text" placeholder="First name" bind:value={contributorCreate.firstName} />
</p>
<p>
    Last name:
    <br />
    <input type="text" placeholder="Last name" bind:value={contributorCreate.lastName} />
</p>
<p>
    Birth year:
    <br />
    <input type="number" min="0" placeholder="Birth year" bind:value={contributorCreate.birthYear} />
</p>
<p>
    Birth month:
    <br />
    <input type="number" min="0" placeholder="Birth month" bind:value={contributorCreate.birthMonth} />
</p>
<p>
    Birth day:
    <br />
    <input type="number" min="0" placeholder="Birth day" bind:value={contributorCreate.birthDay} />
</p>
