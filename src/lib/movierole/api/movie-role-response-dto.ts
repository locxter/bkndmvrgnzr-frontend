import type { MovieContributorResponseBriefDto } from '$lib/moviecontributor/api/movie-contributor-response-brief-dto';

export class MovieRoleResponseDto {
    id: string = '';
    name: string = '';
    movieContributors: MovieContributorResponseBriefDto[] = [];

    constructor(id = '', name = '', movieContributors: MovieContributorResponseBriefDto[] = []) {
        this.id = id;
        this.name = name;
        this.movieContributors = movieContributors;
    }
}
