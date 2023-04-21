<script lang="ts">
    import { BookRoleResponseDto } from '../api/book-role-response-dto';

    export let bookRole: BookRoleResponseDto = new BookRoleResponseDto();
</script>

<h2>{bookRole.name}</h2>
<p>Contributors:</p>
<ul>
    {#each bookRole.bookContributors as bookContributor}
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
