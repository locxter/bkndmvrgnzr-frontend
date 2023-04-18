import type { GenreResponseBriefDto } from '$lib/genre/api/genre-response-brief-dto';
import type { MovieContributorResponseBriefDto } from '$lib/moviecontributor/api/movie-contributor-response-brief-dto';

export class MovieResponseDto {
    isan: string = '';
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = 0;
    genres: GenreResponseBriefDto[] = [];
    movieContributors: MovieContributorResponseBriefDto[] = [];

    constructor(
        isan = '',
        title = '',
        description = '',
        year = 0,
        playTime = 0,
        ageRestriction = 0,
        genres: GenreResponseBriefDto[] = [],
        movieContributors: MovieContributorResponseBriefDto[] = []
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
}
