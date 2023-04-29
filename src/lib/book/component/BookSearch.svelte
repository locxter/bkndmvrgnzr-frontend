<script lang="ts">
    import type { BookController } from '../api/book-controller';
    import type { Book } from '../db/book';

    export let bookController: BookController;
    export let books: Book[];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                books = await bookController.getAllBooksOfSearchQuery(query.trim());
            } else {
                books = await bookController.getAllBooks();
            }
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
