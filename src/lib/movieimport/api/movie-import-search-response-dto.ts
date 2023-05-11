import type { MovieImportResponseBriefDto } from './movie-import-response-brief-dto';

export class MovieImportSearchResponseDto {
    httpStatus: number = 200;
    httpMessage: string = 'OK';
    movies: MovieImportResponseBriefDto[] = [];

    constructor(httpStatus = 200, httpMessage = 'OK', movies: MovieImportResponseBriefDto[] = []) {
        this.httpStatus = httpStatus;
        this.httpMessage = httpMessage;
        this.movies = movies;
    }
}
