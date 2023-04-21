<script lang="ts">
    import { BookResponseDto } from '../api/book-response-dto';

    export let book: BookResponseDto = new BookResponseDto();
</script>

<p>
    Title:
    <br />
    <input type="text" placeholder="Title" bind:value={book.title} />
</p>
<p>
    Subtitle:
    <br />
    <input type="text" placeholder="Subtitle" bind:value={book.subtitle} />
</p>
<p>
    ISBN:
    <br />
    {book.isbn}
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
<p>
    Publishing house:
    <br />
    TODO
</p>
<p>Genres:</p>
<ul>
    <li>TODO</li>
</ul>
<p>Contributors:</p>
<ul>
    <li>TODO</li>
</ul>
