<script lang="ts">
    import { MovieResponseDto } from '../api/movie-response-dto';

    export let movie: MovieResponseDto = new MovieResponseDto();
</script>

<h2>{movie.title}</h2>
<p>
    ISAN:
    <br />
    {movie.isan}
</p>
<p>
    Description:
    <br />
    {movie.description}
</p>
<p>
    Year:
    <br />
    {movie.year}
</p>
<p>
    Play time:
    <br />
    {movie.playTime}
</p>
<p>
    Age restriction:
    <br />
    {movie.ageRestriction}
</p>
<p>Genres:</p>
<ul>
    {#each movie.genres as genre}
        <li>{genre.name}</li>
    {:else}
        <li>No genres</li>
    {/each}
</ul>
<p>Contributors</p>
<ul>
    {#each movie.movieContributors as movieContributor}
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
