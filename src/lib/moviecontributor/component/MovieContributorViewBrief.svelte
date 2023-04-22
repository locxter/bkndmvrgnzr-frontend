<script lang="ts">
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';
    import { MovieContributorResponseDto } from '../api/movie-contributor-response-dto';

    export let movieContributor: MovieContributorResponseDto = new MovieContributorResponseDto();

    let movieRole = movieContributor.movieRole as MovieRoleResponseDto;
    let contributor = movieContributor.contributor as ContributorResponseDto;
</script>

<MovieRoleViewBrief {movieRole} />
:
<ContributorViewBrief {contributor} />
