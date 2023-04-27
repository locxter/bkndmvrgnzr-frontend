import { BookContributorBrief } from '../../bookcontributor/db/book-contributor-brief';
import { MovieContributorBrief } from '../../moviecontributor/db/movie-contributor-brief';
import { ContributorCreateDto } from '../api/contributor-create-dto';
import { ContributorResponseDto } from '../api/contributor-response-dto';
import { ContributorUpdateDto } from '../api/contributor-update-dto';
import { ContributorId } from './contributor-id';

export class Contributor {
    id: ContributorId = new ContributorId();
    firstName: string = '';
    lastName: string = '';
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;
    bookContributors: BookContributorBrief[] = [];
    movieContributors: MovieContributorBrief[] = [];

    constructor(
        id = new ContributorId(),
        firstName = '',
        lastName = '',
        birthYear = 0,
        birthMonth = 0,
        birthDay = 0,
        bookContributors: BookContributorBrief[] = [],
        movieContributors: MovieContributorBrief[] = []
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

    toCreateDto() {
        return new ContributorCreateDto(this.firstName, this.lastName, this.birthYear, this.birthMonth, this.birthDay);
    }

    toUpdateDto() {
        return new ContributorUpdateDto(this.firstName, this.lastName, this.birthYear, this.birthMonth, this.birthDay);
    }

    static fromDto(responseDto = new ContributorResponseDto()) {
        return new Contributor(
            new ContributorId(responseDto.id),
            responseDto.firstName,
            responseDto.lastName,
            responseDto.birthYear,
            responseDto.birthMonth,
            responseDto.birthDay,
            responseDto.bookContributors.map((it) => BookContributorBrief.fromDto(it)),
            responseDto.movieContributors.map((it) => MovieContributorBrief.fromDto(it))
        );
    }
}
