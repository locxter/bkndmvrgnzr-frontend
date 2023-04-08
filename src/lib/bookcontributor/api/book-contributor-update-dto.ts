export class BookContributorUpdateDto {
    contributorId: string = '';
    bookRoleId: string = '';

    constructor(contributorId = '', bookRoleId = '') {
        this.contributorId = contributorId;
        this.bookRoleId = bookRoleId;
    }
}
