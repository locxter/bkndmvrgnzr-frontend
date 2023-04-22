<script lang="ts">
    import { BookUpdateDto } from '../api/book-update-dto';

    export let bookUpdate: BookUpdateDto = new BookUpdateDto();
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
