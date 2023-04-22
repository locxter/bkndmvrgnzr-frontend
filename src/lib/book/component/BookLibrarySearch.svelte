<script lang="ts">
    import type { BookController } from '../api/book-controller';
    import type { BookResponseDto } from '../api/book-response-dto';

    export let bookController: BookController;
    export let books: BookResponseDto[] = [];

    let query: string;

    function search() {
        if (query && query.trim()) {
            bookController
                .getAllBooksOfSearchQueryFromUser(query.trim())
                .then((data) => {
                    books = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        } else {
            bookController
                .getAllBooksOfUser()
                .then((data) => {
                    books = data;
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    }
</script>

<details>
    <summary>Search</summary>
    <p><input id="query" type="text" placeholder="Query" bind:value={query} /></p>
    <p><button on:click={search}>Search</button></p>
</details>
