import { GenreBrief } from '../../genre/db/genre-brief';
import { MovieContributorBrief } from '../../moviecontributor/db/movie-contributor-brief';
import { MovieCreateDto } from '../api/movie-create-dto';
import { MovieResponseDto } from '../api/movie-response-dto';
import { MovieUpdateDto } from '../api/movie-update-dto';
import { Isan } from './isan';

export class Movie {
    isan: Isan = new Isan();
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = 0;
    genres: GenreBrief[] = [];
    movieContributors: MovieContributorBrief[] = [];

    constructor(
        isan = new Isan(),
        title = '',
        description = '',
        year = 0,
        playTime = 0,
        ageRestriction = 0,
        genres: GenreBrief[] = [],
        movieContributors: MovieContributorBrief[] = []
    ) {
        this.isan = isan;
        this.title = title;
        this.description = description;
        this.year = year;
        this.playTime = playTime;
        this.ageRestriction = ageRestriction;
        this.genres = genres;
        this.movieContributors = movieContributors;
    }

    toCreateDto() {
        return new MovieCreateDto(
            this.isan.value,
            this.title,
            this.description,
            this.year,
            this.playTime,
            this.ageRestriction,
            this.genres.map((it) => it.id.value),
            this.movieContributors.map((it) => it.id.value)
        );
    }

    toUpdateDto() {
        return new MovieUpdateDto(
            this.title,
            this.description,
            this.year,
            this.playTime,
            this.ageRestriction,
            this.genres.map((it) => it.id.value),
            this.movieContributors.map((it) => it.id.value)
        );
    }

    static fromDto(responseDto = new MovieResponseDto()) {
        return new Movie(
            new Isan(responseDto.isan),
            responseDto.title,
            responseDto.description,
            responseDto.year,
            responseDto.playTime,
            responseDto.ageRestriction,
            responseDto.genres.map((it) => GenreBrief.fromDto(it)),
            responseDto.movieContributors.map((it) => MovieContributorBrief.fromDto(it))
        );
    }
}
