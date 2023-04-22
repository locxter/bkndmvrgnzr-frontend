<script lang="ts">
    import type { MovieContributorResponseDto } from '../api/movie-contributor-response-dto';
    import MovieContributorViewBrief from './MovieContributorViewBrief.svelte';

    export let movieContributors: MovieContributorResponseDto[] = [];
</script>

<ul>
    {#each movieContributors as movieContributor}
        <li><MovieContributorViewBrief {movieContributor} /></li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
