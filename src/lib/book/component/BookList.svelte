<script lang="ts">
    import type { BookResponseDto } from '../api/book-response-dto';
    import BookViewBrief from './BookViewBrief.svelte';

    export let books: BookResponseDto[] = [];
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
