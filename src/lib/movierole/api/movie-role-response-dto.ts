import type { MovieContributorResponseBriefDto } from '$lib/moviecontributor/api/MovieContributorResponseBriefDto';

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
