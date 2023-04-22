<script lang="ts">
    import { BookContributorResponseDto } from '../api/book-contributor-response-dto';

    export let bookContributor: BookContributorResponseDto = new BookContributorResponseDto();
</script>

<a href="/book-role/{bookContributor.bookRole.id}">{bookContributor.bookRole.name}</a>
:
<a href="/contributor/{bookContributor.contributor.id}">
    {bookContributor.contributor.lastName}, {bookContributor.contributor.firstName}
</a>
