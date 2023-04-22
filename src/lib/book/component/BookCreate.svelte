<script lang="ts">
    import { BookCreateDto } from '../api/book-create-dto';

    export let bookCreate: BookCreateDto = new BookCreateDto();
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
