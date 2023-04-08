export class ContributorResponseBriefDto {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;

    constructor(id = '', firstName = '', lastName = '', birthYear = 0, birthMonth = 0, birthDay = 0) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
    }
}
