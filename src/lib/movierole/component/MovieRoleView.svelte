<script lang="ts">
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import type { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import { MovieRole } from '../db/movie-role';

    export let movieRole: MovieRole = new MovieRole();

    let contributors: ContributorBrief[] = [];

    $: contributors = movieRole.movieContributors.map((it) => it.contributor);
</script>

<h2>{movieRole.name}</h2>
<p>Contributors:</p>
<ContributorList {contributors} />
