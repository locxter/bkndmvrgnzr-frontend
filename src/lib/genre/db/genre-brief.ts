import { GenreResponseBriefDto } from '../api/genre-response-brief-dto';
import { GenreId } from './genre-id';

export class GenreBrief {
    id: GenreId = new GenreId();
    name: string = '';

    constructor(id = new GenreId(), name = '') {
        this.id = id;
        this.name = name;
    }

    static fromDto(responseDto = new GenreResponseBriefDto()) {
        return new GenreBrief(new GenreId(responseDto.id), responseDto.name);
    }
}
