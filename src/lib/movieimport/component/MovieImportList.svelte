<script lang="ts">
    import type { MovieImportResponseBriefDto } from '../api/movie-import-response-brief-dto';
    import MovieImportViewBrief from './MovieImportViewBrief.svelte';

    export let movieImportBriefs: MovieImportResponseBriefDto[];
</script>

<ul>
    {#each movieImportBriefs as movieImportBrief}
        <li>
            <slot {movieImportBrief} />
            <MovieImportViewBrief {movieImportBrief} />
        </li>
    {:else}
        <li>No movies</li>
    {/each}
</ul>
