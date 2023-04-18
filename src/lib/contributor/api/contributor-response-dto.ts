import type { BookContributorResponseBriefDto } from '$lib/bookcontributor/api/book-contributor-response-brief-dto';
import type { MovieContributorResponseBriefDto } from '$lib/moviecontributor/api/movie-contributor-response-brief-dto';

export class ContributorResponseDto {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;
    bookContributors: BookContributorResponseBriefDto[] = [];
    movieContributors: MovieContributorResponseBriefDto[] = [];

    constructor(
        id = '',
        firstName = '',
        lastName = '',
        birthYear = 0,
        birthMonth = 0,
        birthDay = 0,
        bookContributors: BookContributorResponseBriefDto[] = [],
        movieContributors: MovieContributorResponseBriefDto[] = []
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.bookContributors = bookContributors;
        this.movieContributors = movieContributors;
    }
}
