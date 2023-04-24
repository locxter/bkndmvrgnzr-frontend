<script lang="ts">
    import type { MovieContributorResponseDto } from '$lib/moviecontributor/api/movie-contributor-response-dto';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRole: MovieRoleResponseDto = new MovieRoleResponseDto();

    $: movieContributors = movieRole.movieContributors as MovieContributorResponseDto[];
</script>

<h2>{movieRole.name}</h2>
<p>Contributors:</p>
<MovieContributorList {movieContributors} />
