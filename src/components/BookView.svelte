<script lang="ts">
    import { BookResponseDto } from '$lib/book/api/book-response-dto';

    export let book: BookResponseDto = new BookResponseDto();
</script>

<h2>{book.title}</h2>
{#if book.subtitle}
    <h3>{book.subtitle}</h3>
{/if}
<p>
    ISBN:
    <br />
    {book.isbn}
</p>
<p>
    Description:
    <br />
    {book.description}
</p>
<p>
    Year:
    <br />
    {book.year}
</p>
<p>
    Pages:
    <br />
    {book.pages}
</p>
<p>
    Publishing house:
    <br />
    {book.publishingHouse.name}
    {#if book.publishingHouse.city && book.publishingHouse.country}
        ({book.publishingHouse.city}, {book.publishingHouse.country})
    {/if}
</p>
<p>Genres:</p>
<ul>
    {#each book.genres as genre}
        <li>{genre.name}</li>
    {:else}
        <li>No genres</li>
    {/each}
</ul>
<p>Contributors:</p>
<ul>
    {#each book.bookContributors as bookContributor}
        <li>
            <a href="/contributor/{bookContributor.contributor.id}">
                {bookContributor.bookRole.name}: {bookContributor.contributor.lastName}, {bookContributor.contributor
                    .firstName}
            </a>
        </li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
