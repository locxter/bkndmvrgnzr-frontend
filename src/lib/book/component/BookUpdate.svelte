<script lang="ts">
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { onMount } from 'svelte';
    import type { PublishingHouseResponseDto } from '$lib/publishinghouse/api/publishing-house-response-dto';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import type { BookContributorResponseDto } from '$lib/bookcontributor/api/book-contributor-response-dto';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import BookContributorSearch from '$lib/bookcontributor/component/BookContributorSearch.svelte';
    import { BookUpdateDto } from '../api/book-update-dto';

    export let bookUpdate: BookUpdateDto = new BookUpdateDto();
    export let publishingHouseController: PublishingHouseController;
    export let genreController: GenreController;
    export let bookContributorController: BookContributorController;

    let publishingHouses: PublishingHouseResponseDto[];
    let genres: GenreResponseDto[];
    let bookContributors: BookContributorResponseDto[];

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

    function togglePublishingHouse(publishingHouse: PublishingHouseResponseDto) {
        if (bookUpdate.publishingHouseId === publishingHouse.id) {
            bookUpdate.publishingHouseId = '';
        } else {
            bookUpdate.publishingHouseId = publishingHouse.id;
        }
    }

    function toggleGenre(genre: GenreResponseDto) {
        if (bookUpdate.genreIds.includes(genre.id)) {
            bookUpdate.genreIds.splice(bookUpdate.genreIds.indexOf(genre.id), 1);
            bookUpdate.genreIds = bookUpdate.genreIds;
        } else {
            bookUpdate.genreIds = [...bookUpdate.genreIds, genre.id];
        }
    }

    function toggleBookContributor(bookContributor: BookContributorResponseDto) {
        if (bookUpdate.bookContributorIds.includes(bookContributor.id)) {
            bookUpdate.bookContributorIds.splice(bookUpdate.bookContributorIds.indexOf(bookContributor.id), 1);
            bookUpdate.bookContributorIds = bookUpdate.bookContributorIds;
        } else {
            bookUpdate.bookContributorIds = [...bookUpdate.bookContributorIds, bookContributor.id];
        }
    }
</script>

<p>
    Title:
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
<p>Publishing house:</p>
<PublishingHouseSearch bind:publishingHouses {publishingHouseController} />
<PublishingHouseList {publishingHouses} let:publishingHouse>
    <button on:click={() => togglePublishingHouse(publishingHouse)}>
        {#if bookUpdate.publishingHouseId === publishingHouse.id}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</PublishingHouseList>
{#if bookUpdate.publishingHouseId}
    <p>Publishing house selected</p>
{:else}
    <p>No publishing house selected</p>
{/if}
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if bookUpdate.genreIds.includes(genre.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{bookUpdate.genreIds.length} genres selected</p>
<p>Contributors:</p>
<BookContributorSearch bind:bookContributors {bookContributorController} />
<BookContributorList {bookContributors} let:bookContributor>
    <button on:click={() => toggleBookContributor(bookContributor)}>
        {#if bookUpdate.bookContributorIds.includes(bookContributor.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookContributorList>
<p>{bookUpdate.bookContributorIds.length} contributors selected</p>
