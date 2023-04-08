export class MovieContributorCreateDto {
    contributorId: string = '';
    movieRoleId: string = '';

    constructor(contributorId = '', movieRoleId = '') {
        this.contributorId = contributorId;
        this.movieRoleId = movieRoleId;
    }
}
