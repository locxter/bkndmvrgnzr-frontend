<script lang="ts">
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import { Book } from '../db/book';
    import BookBookContributorSelect from './BookBookContributorSelect.svelte';
    import BookGenreSelect from './BookGenreSelect.svelte';
    import BookPublishingHouseSelect from './BookPublishingHouseSelect.svelte';

    export let book: Book = new Book();
    export let publishingHouseController: PublishingHouseController;
    export let genreController: GenreController;
    export let bookContributorController: BookContributorController;
</script>

<p>
    ISBN*:
    <br />
    <input type="text" maxlength="17" placeholder="ISBN" bind:value={book.isbn.value} />
</p>
<p>
    Title*:
    <br />
    <input type="text" placeholder="Title" bind:value={book.title} />
</p>
<p>
    Subtitle:
    <br />
    <input type="text" placeholder="Subtitle" bind:value={book.subtitle} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={book.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={book.year} />
</p>
<p>
    Pages:
    <br />
    <input type="number" min="0" placeholder="Pages" bind:value={book.pages} />
</p>
<p>Publishing house*:</p>
<BookPublishingHouseSelect bind:book {publishingHouseController} />
<p>Genres:</p>
<BookGenreSelect bind:book {genreController} />
<p>Contributors:</p>
<BookBookContributorSelect bind:book {bookContributorController} />
<p>* Required</p>
