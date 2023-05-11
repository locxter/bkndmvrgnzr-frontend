<script lang="ts">
    import type { MovieImportResponseBriefDto } from '../api/movie-import-response-brief-dto';

    export let movieImportBrief: MovieImportResponseBriefDto;
</script>

{#if movieImportBrief.directorLastName && movieImportBrief.directorFirstName}
    {movieImportBrief.directorLastName}, {movieImportBrief.directorFirstName}:
{/if}
{movieImportBrief.title}
{#if movieImportBrief.year}
    ({movieImportBrief.year})
{/if}
