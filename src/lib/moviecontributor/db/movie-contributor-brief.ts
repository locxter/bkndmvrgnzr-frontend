import { ContributorBrief } from '../../contributor/db/contributor-brief';
import { MovieRoleBrief } from '../../movierole/db/movie-role-brief';
import { MovieContributorResponseBriefDto } from '../api/movie-contributor-response-brief-dto';
import { MovieContributorId } from './movie-contributor-id';

export class MovieContributorBrief {
    id: MovieContributorId = new MovieContributorId();
    contributor: ContributorBrief = new ContributorBrief();
    movieRole: MovieRoleBrief = new MovieRoleBrief();

    constructor(id = new MovieContributorId(), contributor = new ContributorBrief(), movieRole = new MovieRoleBrief()) {
        this.id = id;
        this.contributor = contributor;
        this.movieRole = movieRole;
    }

    static fromDto(responseDto = new MovieContributorResponseBriefDto()) {
        return new MovieContributorBrief(
            new MovieContributorId(responseDto.id),
            ContributorBrief.fromDto(responseDto.contributor),
            MovieRoleBrief.fromDto(responseDto.movieRole)
        );
    }
}
