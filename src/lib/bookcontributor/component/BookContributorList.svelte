<script lang="ts">
    import type { BookContributorBrief } from '../db/book-contributor-brief';
    import BookContributorViewBrief from './BookContributorViewBrief.svelte';

    export let bookContributors: BookContributorBrief[] = [];
</script>

<ul>
    {#each bookContributors as bookContributor}
        <li>
            <slot {bookContributor} />
            <BookContributorViewBrief {bookContributor} />
        </li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
