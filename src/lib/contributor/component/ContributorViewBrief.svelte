<script lang="ts">
    import { ContributorBrief } from '../db/contributor-brief';

    export let contributor: ContributorBrief = new ContributorBrief();
</script>

<a href="/contributor/{contributor.id.value}">{contributor.lastName}, {contributor.firstName}</a>
