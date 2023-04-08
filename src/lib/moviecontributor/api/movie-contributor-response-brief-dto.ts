import { ContributorResponseBriefDto } from '$lib/contributor/api/ContributorResponseBriefDto';
import { MovieRoleResponseBriefDto } from '$lib/movierole/api/MovieRoleResponseBriefDto';

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
