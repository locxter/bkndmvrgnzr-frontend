<script lang="ts">
    import type { BookBrief } from '../db/book-brief';
    import BookViewBrief from './BookViewBrief.svelte';

    export let books: BookBrief[] = [];
</script>

<ul>
    {#each books as book}
        <li>
            <slot {book} />
            <BookViewBrief {book} />
        </li>
    {:else}
        <li>No books</li>
    {/each}
</ul>
