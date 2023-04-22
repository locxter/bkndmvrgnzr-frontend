<script lang="ts">
    import { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRole: MovieRoleResponseDto = new MovieRoleResponseDto();
</script>

<h2>{movieRole.name}</h2>
<p>Contributors:</p>
<ul>
    {#each movieRole.movieContributors as movieContributor}
        <li>
            <a href="/contributor/{movieContributor.contributor.id}">
                {movieContributor.movieRole.name}: {movieContributor.contributor.lastName}, {movieContributor
                    .contributor.firstName}
            </a>
        </li>
    {:else}
        <li>No contributors</li>
    {/each}
</ul>
