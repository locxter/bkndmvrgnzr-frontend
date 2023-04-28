<script lang="ts">
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import BookContributorSearch from '$lib/bookcontributor/component/BookContributorSearch.svelte';
    import type { BookContributor } from '$lib/bookcontributor/db/book-contributor';
    import type { BookContributorBrief } from '$lib/bookcontributor/db/book-contributor-brief';
    import { onMount } from 'svelte';
    import { Book } from '../db/book';

    export let book: Book = new Book();
    export let bookContributorController: BookContributorController;

    let bookContributors: BookContributor[] = [];

    onMount(async () => {
        try {
            bookContributors = await bookContributorController.getAllBookContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function toggleBookContributor(bookContributor: BookContributorBrief) {
        if (book.bookContributors.map((it) => it.id.value).includes(bookContributor.id.value)) {
            book.bookContributors.splice(
                book.bookContributors.map((it) => it.id.value).indexOf(bookContributor.id.value),
                1
            );
            book.bookContributors = book.bookContributors;
        } else {
            book.bookContributors = [...book.bookContributors, bookContributor];
        }
    }
</script>

<BookContributorSearch bind:bookContributors {bookContributorController} />
<BookContributorList {bookContributors} let:bookContributor>
    <button on:click={() => toggleBookContributor(bookContributor)}>
        {#if book.bookContributors.map((it) => it.id.value).includes(bookContributor.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookContributorList>
<p>{book.bookContributors.length} contributors selected</p>
