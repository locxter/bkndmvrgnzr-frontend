<script lang="ts">
    import type { BookController } from '$lib/book/api/book-controller';
    import BookViewBrief from '$lib/book/component/BookViewBrief.svelte';
    import type { Book } from '$lib/book/db/book';
    import BookRoleViewBrief from '$lib/bookrole/component/BookRoleViewBrief.svelte';
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import type { Contributor } from '../db/contributor';

    export let contributor: Contributor;
    export let bookController: BookController;

    let bookRolesBooks: { bookRole: BookRoleBrief; books: Book[] }[] = [];

    $: loadIndirectData(contributor);

    async function loadIndirectData(contributor: Contributor) {
        try {
            let internalBookRolesBooks: { bookRole: BookRoleBrief; books: Book[] }[] = [];
            for (let bookContributor of contributor.bookContributors) {
                let data = await bookController.getAllBooksOfBookContributor(bookContributor.id);
                if (data.length) {
                    internalBookRolesBooks = [
                        ...internalBookRolesBooks,
                        {
                            bookRole: bookContributor.bookRole,
                            books: data,
                        },
                    ];
                }
            }
            bookRolesBooks = internalBookRolesBooks;
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<ul>
    {#each bookRolesBooks as bookRoleBooks}
        {#each bookRoleBooks.books as bookRoleBook}
            <li>
                <BookRoleViewBrief bookRole={bookRoleBooks.bookRole} />
                :
                <BookViewBrief book={bookRoleBook} />
            </li>
        {/each}
    {:else}
        <li>No books</li>
    {/each}
</ul>
