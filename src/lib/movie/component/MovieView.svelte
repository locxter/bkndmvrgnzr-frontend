<script lang="ts">
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import type { GenreBrief } from '$lib/genre/db/genre-brief';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import type { MovieContributorBrief } from '$lib/moviecontributor/db/movie-contributor-brief';
    import type { Movie } from '../db/movie';

    export let movie: Movie;

    $: genres = movie.genres;
    $: movieContributors = movie.movieContributors;
</script>

<h2>{movie.title}</h2>
<p>
    ISAN:
    <br />
    {movie.isan.value}
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
<GenreList {genres} />
<p>Contributors</p>
<MovieContributorList {movieContributors} />
