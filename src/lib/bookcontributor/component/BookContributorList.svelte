<script lang="ts">
    import type { BookContributorResponseDto } from '../api/book-contributor-response-dto';
    import BookContributorViewBrief from './BookContributorViewBrief.svelte';

    export let bookContributors: BookContributorResponseDto[] = [];
</script>

<ul>
    {#each bookContributors as bookContributor}
        <li><BookContributorViewBrief {bookContributor} /></li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
