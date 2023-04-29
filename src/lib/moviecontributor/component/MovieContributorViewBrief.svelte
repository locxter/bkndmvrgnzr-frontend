<script lang="ts">
    import type { BookRoleBrief } from '$lib/bookrole/db/book-role-brief';
    import ContributorViewBrief from '$lib/contributor/component/ContributorViewBrief.svelte';
    import type { ContributorBrief } from '$lib/contributor/db/contributor-brief';
    import MovieRoleViewBrief from '$lib/movierole/component/MovieRoleViewBrief.svelte';
    import type { MovieContributorBrief } from '../db/movie-contributor-brief';

    export let movieContributor: MovieContributorBrief;

    $: movieRole = movieContributor.movieRole;
    $: contributor = movieContributor.contributor;
</script>

<MovieRoleViewBrief {movieRole} />
:
<ContributorViewBrief {contributor} />
