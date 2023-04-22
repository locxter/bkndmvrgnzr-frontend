<script lang="ts">
    import { MovieContributorResponseDto } from '../api/movie-contributor-response-dto';

    export let movieContributor: MovieContributorResponseDto = new MovieContributorResponseDto();
</script>

<a href="/movie-role/{movieContributor.movieRole.id}">{movieContributor.movieRole.name}</a>
:
<a href="/contributor/{movieContributor.contributor.id}">
    {movieContributor.contributor.lastName}, {movieContributor.contributor.firstName}
</a>
