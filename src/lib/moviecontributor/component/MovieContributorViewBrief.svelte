<script lang="ts">
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import type { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';
    import { MovieContributorBrief } from '../db/movie-contributor-brief';

    export let movieContributor: MovieContributorBrief = new MovieContributorBrief();

    let movieRole: BookRoleBrief;
    let contributor: ContributorBrief;

    $: movieRole = movieContributor.movieRole;
    $: contributor = movieContributor.contributor;
</script>

<MovieRoleViewBrief {movieRole} />
:
<ContributorViewBrief {contributor} />
