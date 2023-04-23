<script lang="ts">
    import type { BookController } from '../api/book-controller';
    import type { BookResponseDto } from '../api/book-response-dto';

    export let bookController: BookController;
    export let books: BookResponseDto[] = [];

    let query: string;

    async function search() {
        try {
            if (query && query.trim()) {
                books = await bookController.getAllBooksOfSearchQueryFromUser(query.trim());
            } else {
                books = await bookController.getAllBooksOfUser();
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
