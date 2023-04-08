export class BookContributorCreateDto {
    contributorId: string = '';
    bookRoleId: string = '';

    constructor(contributorId = '', bookRoleId = '') {
        this.contributorId = contributorId;
        this.bookRoleId = bookRoleId;
    }
}
