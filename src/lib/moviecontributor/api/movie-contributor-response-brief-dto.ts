import { ContributorResponseBriefDto } from '$lib/contributor/api/contributor-response-brief-dto';
import { MovieRoleResponseBriefDto } from '$lib/movierole/api/movie-role-response-brief-dto';

export class MovieContributorResponseBriefDto {
    id: string = '';
    contributor: ContributorResponseBriefDto = new ContributorResponseBriefDto();
    movieRole: MovieRoleResponseBriefDto = new MovieRoleResponseBriefDto();

    constructor(id = '', contributor = new ContributorResponseBriefDto(), movieRole = new MovieRoleResponseBriefDto()) {
        this.id = id;
        this.contributor = contributor;
        this.movieRole = movieRole;
    }
}
