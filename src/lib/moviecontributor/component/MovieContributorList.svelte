<script lang="ts">
    import type { MovieContributorBrief } from '../db/movie-contributor-brief';
    import MovieContributorViewBrief from './MovieContributorViewBrief.svelte';

    export let movieContributors: MovieContributorBrief[];
</script>

<ul>
    {#each movieContributors as movieContributor}
        <li>
            <slot {movieContributor} />
            <MovieContributorViewBrief {movieContributor} />
        </li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
