<script lang="ts">
    import type { GenreResponseDto } from '$lib/genre/api/genre-response-dto';
    import GenreList from '$lib/genre/component/GenreList.svelte';
    import type { MovieContributorResponseDto } from '$lib/moviecontributor/api/movie-contributor-response-dto';
    import MovieContributorList from '$lib/moviecontributor/component/MovieContributorList.svelte';
    import { MovieResponseDto } from '../api/movie-response-dto';

    export let movie: MovieResponseDto = new MovieResponseDto();

    let genres = movie.genres as GenreResponseDto[];
    let movieContributors = movie.movieContributors as MovieContributorResponseDto[];
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
<GenreList {genres} />
<p>Contributors</p>
<MovieContributorList {movieContributors} />
