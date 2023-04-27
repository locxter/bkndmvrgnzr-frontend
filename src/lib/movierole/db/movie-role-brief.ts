import { MovieRoleResponseBriefDto } from '../api/movie-role-response-brief-dto';
import { MovieRoleId } from './movie-role-id';

export class MovieRoleBrief {
    id: MovieRoleId = new MovieRoleId();
    name: string = '';

    constructor(id = new MovieRoleId(), name = '') {
        this.id = id;
        this.name = name;
    }

    static fromDto(responseDto = new MovieRoleResponseBriefDto()) {
        return new MovieRoleBrief(new MovieRoleId(responseDto.id), responseDto.name);
    }
}
