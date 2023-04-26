<script lang="ts">
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import type { BookContributorResponseDto } from '$lib/bookcontributor/api/book-contributor-response-dto';
    import BookContributorList from '$lib/bookcontributor/component/BookContributorList.svelte';
    import BookContributorSearch from '$lib/bookcontributor/component/BookContributorSearch.svelte';
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import GenreSearch from '$lib/genre/component/GenreSearch.svelte';
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import type { PublishingHouseResponseDto } from '$lib/publishinghouse/api/publishing-house-response-dto';
    import PublishingHouseList from '$lib/publishinghouse/component/PublishingHouseList.svelte';
    import PublishingHouseSearch from '$lib/publishinghouse/component/PublishingHouseSearch.svelte';
    import { onMount } from 'svelte';
    import { BookCreateDto } from '../api/book-create-dto';

    export let bookCreate: BookCreateDto = new BookCreateDto();
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
        if (bookCreate.publishingHouseId === publishingHouse.id) {
            bookCreate.publishingHouseId = '';
        } else {
            bookCreate.publishingHouseId = publishingHouse.id;
        }
    }

    function toggleGenre(genre: GenreResponseDto) {
        if (bookCreate.genreIds.includes(genre.id)) {
            bookCreate.genreIds.splice(bookCreate.genreIds.indexOf(genre.id), 1);
            bookCreate.genreIds = bookCreate.genreIds;
        } else {
            bookCreate.genreIds = [...bookCreate.genreIds, genre.id];
        }
    }

    function toggleBookContributor(bookContributor: BookContributorResponseDto) {
        if (bookCreate.bookContributorIds.includes(bookContributor.id)) {
            bookCreate.bookContributorIds.splice(bookCreate.bookContributorIds.indexOf(bookContributor.id), 1);
            bookCreate.bookContributorIds = bookCreate.bookContributorIds;
        } else {
            bookCreate.bookContributorIds = [...bookCreate.bookContributorIds, bookContributor.id];
        }
    }
</script>

<p>
    ISBN:
    <br />
    <input type="text" placeholder="ISBN" bind:value={bookCreate.isbn} />
</p>
<p>
    Title:
    <br />
    <input type="text" placeholder="Title" bind:value={bookCreate.title} />
</p>
<p>
    Subtitle:
    <br />
    <input type="text" placeholder="Subtitle" bind:value={bookCreate.subtitle} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={bookCreate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={bookCreate.year} />
</p>
<p>
    Pages:
    <br />
    <input type="number" min="0" placeholder="Pages" bind:value={bookCreate.pages} />
</p>
<p>Publishing house:</p>
<PublishingHouseSearch bind:publishingHouses {publishingHouseController} />
<PublishingHouseList {publishingHouses} let:publishingHouse>
    <button on:click={() => togglePublishingHouse(publishingHouse)}>
        {#if bookCreate.publishingHouseId === publishingHouse.id}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</PublishingHouseList>
{#if bookCreate.publishingHouseId}
    <p>Publishing house selected</p>
{:else}
    <p>No publishing house selected</p>
{/if}
<p>Genres:</p>
<GenreSearch bind:genres {genreController} />
<GenreList {genres} let:genre>
    <button on:click={() => toggleGenre(genre)}>
        {#if bookCreate.genreIds.includes(genre.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</GenreList>
<p>{bookCreate.genreIds.length} genres selected</p>
<p>Contributors:</p>
<BookContributorSearch bind:bookContributors {bookContributorController} />
<BookContributorList {bookContributors} let:bookContributor>
    <button on:click={() => toggleBookContributor(bookContributor)}>
        {#if bookCreate.bookContributorIds.includes(bookContributor.id)}
            Deselect
        {:else}
            Select
        {/if}
    </button>
</BookContributorList>
<p>{bookCreate.bookContributorIds.length} contributors selected</p>
