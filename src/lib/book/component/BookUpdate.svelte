<script lang="ts">
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import BookContributorSearch from '$lib/bookcontributor/component/BookContributorSearch.svelte';
    import type { BookContributor } from '$lib/bookcontributor/db/book-contributor';
    import type { BookContributorBrief } from '$lib/bookcontributor/db/book-contributor-brief';
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { Genre } from '$lib/genre/db/genre';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';
    import type { PublishingHouse } from '$lib/publishinghouse/db/publishing-house';
    import type { PublishingHouseBrief } from '$lib/publishinghouse/db/publishing-house-brief';
    import { onMount } from 'svelte';
    import { Book } from '../db/book';

    export let bookUpdate: Book = new Book();
    export let publishingHouseController: PublishingHouseController;
    export let genreController: GenreController;
    export let bookContributorController: BookContributorController;

    let publishingHouses: PublishingHouse[] = [];
    let genres: Genre[] = [];
    let bookContributors: BookContributor[] = [];

    onMount(async () => {
        try {
            publishingHouses = await publishingHouseController.getAllPublishingHouses();
            genres = await genreController.getAllGenres();
            bookContributors = await bookContributorController.getAllBookContributors();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    function togglePublishingHouse(publishingHouse: PublishingHouseBrief) {
        if (bookUpdate.publishingHouse.id.value === publishingHouse.id.value) {
            bookUpdate.publishingHouse.id.value = '';
        } else {
            bookUpdate.publishingHouse = publishingHouse;
        }
    }

    function toggleGenre(genre: GenreBrief) {
        if (bookUpdate.genres.map((it) => it.id.value).includes(genre.id.value)) {
            bookUpdate.genres.splice(bookUpdate.genres.map((it) => it.id.value).indexOf(genre.id.value), 1);
            bookUpdate.genres = bookUpdate.genres;
        } else {
            bookUpdate.genres = [...bookUpdate.genres, genre];
        }
    }

    function toggleBookContributor(bookContributor: BookContributorBrief) {
        if (bookUpdate.bookContributors.map((it) => it.id.value).includes(bookContributor.id.value)) {
            bookUpdate.bookContributors.splice(
                bookUpdate.bookContributors.map((it) => it.id.value).indexOf(bookContributor.id.value),
                1
            );
            bookUpdate.bookContributors = bookUpdate.bookContributors;
        } else {
            bookUpdate.bookContributors = [...bookUpdate.bookContributors, bookContributor];
        }
    }
</script>

<p>
    Title*:
    <br />
    <input type="text" placeholder="Title" bind:value={bookUpdate.title} />
</p>
<p>
    Subtitle:
    <br />
    <input type="text" placeholder="Subtitle" bind:value={bookUpdate.subtitle} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={bookUpdate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={bookUpdate.year} />
</p>
<p>
    Pages:
    <br />
    <input type="number" min="0" placeholder="Pages" bind:value={bookUpdate.pages} />
</p>
<p>Publishing house*:</p>
<PublishingHouseSearch bind:publishingHouses {publishingHouseController} />
<PublishingHouseList {publishingHouses} let:publishingHouse>
    <button on:click={() => togglePublishingHouse(publishingHouse)}>
        {#if bookUpdate.publishingHouse.id.value === publishingHouse.id.value}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</PublishingHouseList>
{#if bookUpdate.publishingHouse.id.value}
    <p>Publishing house selected</p>
{:else}
    <p>No publishing house selected</p>
{/if}
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if bookUpdate.genres.map((it) => it.id.value).includes(genre.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{bookUpdate.genres.length} genres selected</p>
<p>Contributors:</p>
<BookContributorSearch bind:bookContributors {bookContributorController} />
<BookContributorList {bookContributors} let:bookContributor>
    <button on:click={() => toggleBookContributor(bookContributor)}>
        {#if bookUpdate.bookContributors.map((it) => it.id.value).includes(bookContributor.id.value)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookContributorList>
<p>{bookUpdate.bookContributors.length} contributors selected</p>
<p>* Required</p>
