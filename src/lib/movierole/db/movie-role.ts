import { MovieContributorBrief } from '../../moviecontributor/db/movie-contributor-brief';
import { MovieRoleCreateDto } from '../api/movie-role-create-dto';
import { MovieRoleResponseDto } from '../api/movie-role-response-dto';
import { MovieRoleUpdateDto } from '../api/movie-role-update-dto';
import { MovieRoleId } from './movie-role-id';

export class MovieRole {
    id: MovieRoleId = new MovieRoleId();
    name: string = '';
    movieContributors: MovieContributorBrief[] = [];

    constructor(id = new MovieRoleId(), name = '', movieContributors: MovieContributorBrief[] = []) {
        this.id = id;
        this.name = name;
        this.movieContributors = movieContributors;
    }

    toCreateDto() {
        return new MovieRoleCreateDto(this.name);
    }

    toUpdateDto() {
        return new MovieRoleUpdateDto(this.name);
    }

    static fromDto(responseDto = new MovieRoleResponseDto()) {
        return new MovieRole(
            new MovieRoleId(responseDto.id),
            responseDto.name,
            responseDto.movieContributors.map((it) => MovieContributorBrief.fromDto(it))
        );
    }
}
