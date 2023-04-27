<script lang="ts">
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRole: MovieRoleResponseDto = new MovieRoleResponseDto();

    let contributors: ContributorResponseDto[] = [];

    $: contributors = movieRole.movieContributors.map((it) => it.contributor as ContributorResponseDto);
</script>

<h2>{movieRole.name}</h2>
<p>Contributors:</p>
<ContributorList {contributors} />
