<script lang="ts">
    import type { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import type { BookImportController } from '$lib/bookimport/api/book-import-controller';
    import { BookImportResponseDto } from '$lib/bookimport/api/book-import-response-dto';
    import BookImport from '$lib/bookimport/component/BookImport.svelte';
    import type { GenreController } from '$lib/genre/api/genre-controller';
    import type { PublishingHouseController } from '$lib/publishinghouse/api/publishing-house-controller';
    import type { Book } from '../db/book';
    import BookBookContributorSelect from './BookBookContributorSelect.svelte';
    import BookGenreSelect from './BookGenreSelect.svelte';
    import BookPublishingHouseSelect from './BookPublishingHouseSelect.svelte';

    export let book: Book;
    export let bookImportController: BookImportController;
    export let publishingHouseController: PublishingHouseController;
    export let genreController: GenreController;
    export let bookContributorController: BookContributorController;

    let bookImportResponse = new BookImportResponseDto();

    $: authorFullName =
        bookImportResponse.authorFirstName && bookImportResponse.authorLastName
            ? bookImportResponse.authorFirstName + ' ' + bookImportResponse.authorLastName
            : '';
</script>

<BookImport bind:book bind:bookImportResponse {bookImportController} />
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
<BookPublishingHouseSelect bind:book query={bookImportResponse.publishingHouseName} {publishingHouseController} />
<p>Genres:</p>
<BookGenreSelect bind:book {genreController} />
<p>Contributors:</p>
<BookBookContributorSelect bind:book query={authorFullName} {bookContributorController} />
<p>* Required</p>
