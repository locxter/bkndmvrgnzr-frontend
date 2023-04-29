<script lang="ts">
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import type { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import type { BookRole } from '../db/book-role';

    export let bookRole: BookRole;

    $: contributors = bookRole.bookContributors.map((it) => it.contributor);
</script>

<h2>{bookRole.name}</h2>
<p>Contributors:</p>
<ContributorList {contributors} />
