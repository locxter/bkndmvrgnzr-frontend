import { ContributorResponseBriefDto } from '../api/contributor-response-brief-dto';
import { ContributorId } from './contributor-id';

export class ContributorBrief {
    id: ContributorId = new ContributorId();
    firstName: string = '';
    lastName: string = '';
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;

    constructor(id = new ContributorId(), firstName = '', lastName = '', birthYear = 0, birthMonth = 0, birthDay = 0) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
    }

    static fromDto(responseDto = new ContributorResponseBriefDto()) {
        return new ContributorBrief(
            new ContributorId(responseDto.id),
            responseDto.firstName,
            responseDto.lastName,
            responseDto.birthYear,
            responseDto.birthMonth,
            responseDto.birthDay
        );
    }
}
