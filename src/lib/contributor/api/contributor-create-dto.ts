export class ContributorCreateDto {
    firstName: string = '';
    lastName: string = '';
    birthYear: number = 0;
    birthMonth: number = 0;
    birthDay: number = 0;

    constructor(firstName = '', lastName = '', birthYear = 0, birthMonth = 0, birthDay = 0) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
    }
}
