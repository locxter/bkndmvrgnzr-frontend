import { ContributorBrief } from '../../contributor/db/contributor-brief';
import { MovieBrief } from '../../movie/db/movie-brief';
import { MovieRoleBrief } from '../../movierole/db/movie-role-brief';
import { MovieContributorCreateDto } from '../api/movie-contributor-create-dto';
import { MovieContributorResponseDto } from '../api/movie-contributor-response-dto';
import { MovieContributorUpdateDto } from '../api/movie-contributor-update-dto';
import { MovieContributorId } from './movie-contributor-id';

export class MovieContributor {
    id: MovieContributorId = new MovieContributorId();
    contributor: ContributorBrief = new ContributorBrief();
    movieRole: MovieRoleBrief = new MovieRoleBrief();
    movies: MovieBrief[] = [];

    constructor(
        id = new MovieContributorId(),
        contributor = new ContributorBrief(),
        movieRole = new MovieRoleBrief(),
        movies: MovieBrief[] = []
    ) {
        this.id = id;
        this.contributor = contributor;
        this.movieRole = movieRole;
        this.movies = movies;
    }

    toCreateDto() {
        return new MovieContributorCreateDto(this.contributor.id.value, this.movieRole.id.value);
    }

    toUpdateDto() {
        return new MovieContributorUpdateDto(this.contributor.id.value, this.movieRole.id.value);
    }

    static fromDto(responseDto = new MovieContributorResponseDto()) {
        return new MovieContributor(
            new MovieContributorId(responseDto.id),
            ContributorBrief.fromDto(responseDto.contributor),
            MovieRoleBrief.fromDto(responseDto.movieRole),
            responseDto.movies.map((it) => MovieBrief.fromDto(it))
        );
    }
}
