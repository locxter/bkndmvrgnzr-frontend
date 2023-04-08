export class MovieUpdateDto {
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = -1;
    genreIds: string[] = [];
    movieContributorIds: string[] = [];

    constructor(
        title = '',
        description = '',
        year = 0,
        playTime = 0,
        ageRestriction = 0,
        genreIds: string[] = [],
        movieContributorIds: string[] = []
    ) {
        this.title = title;
        this.description = description;
        this.year = year;
        this.playTime = playTime;
        this.ageRestriction = ageRestriction;
        this.genreIds = genreIds;
        this.movieContributorIds = movieContributorIds;
    }
}
