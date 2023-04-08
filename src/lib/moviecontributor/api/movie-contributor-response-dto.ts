import { ContributorResponseBriefDto } from '$lib/contributor/api/contributor-response-brief-dto';
import type { MovieResponseBriefDto } from '$lib/movie/api/movie-response-brief-dto';
import { MovieRoleResponseBriefDto } from '$lib/movierole/api/movie-role-response-brief-dto';

export class MovieContributorResponseDto {
    id: string = '';
    contributor: ContributorResponseBriefDto = new ContributorResponseBriefDto();
    movieRole: MovieRoleResponseBriefDto = new MovieRoleResponseBriefDto();
    movies: MovieResponseBriefDto[] = [];

    constructor(
        id = '',
        contributor = new ContributorResponseBriefDto(),
        movieRole = new MovieRoleResponseBriefDto(),
        movies: MovieResponseBriefDto[] = []
    ) {
        this.id = id;
        this.contributor = contributor;
        this.movieRole = movieRole;
        this.movies = movies;
    }
}
