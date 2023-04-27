import { MovieResponseBriefDto } from '../api/movie-response-brief-dto';
import { Isan } from './isan';

export class MovieBrief {
    isan: Isan = new Isan();
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = 0;

    constructor(isan = new Isan(), title = '', description = '', year = 0, playTime = 0, ageRestriction = 0) {
        this.isan = isan;
        this.title = title;
        this.description = description;
        this.year = year;
        this.playTime = playTime;
        this.ageRestriction = ageRestriction;
    }

    static fromDto(responseDto = new MovieResponseBriefDto()) {
        return new MovieBrief(
            new Isan(responseDto.isan),
            responseDto.title,
            responseDto.description,
            responseDto.year,
            responseDto.playTime,
            responseDto.ageRestriction
        );
    }
}
