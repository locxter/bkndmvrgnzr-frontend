<script lang="ts">
    import type { ContributorBrief } from '../db/contributor-brief';

    export let contributor: ContributorBrief;
</script>

<a href="/contributor/{contributor.id.value}">{contributor.lastName}, {contributor.firstName}</a>
