<script lang="ts">
    import { ContributorResponseDto } from '../api/contributor-response-dto';

    export let contributor: ContributorResponseDto = new ContributorResponseDto();
</script>

<a href="/contributor/{contributor.id}">{contributor.lastName}, {contributor.firstName}</a>
