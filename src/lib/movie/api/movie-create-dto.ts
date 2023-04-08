export class MovieCreateDto {
    isan: string = '';
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = 0;
    genreIds: string[] = [];
    movieContributorIds: string[] = [];

    constructor(
        isan = '',
        title = '',
        description = '',
        year = 0,
        playTime = 0,
        ageRestriction = 0,
        genreIds: string[] = [],
        movieContributorIds: string[] = []
    ) {
        this.isan = isan;
        this.title = title;
        this.description = description;
        this.year = year;
        this.playTime = playTime;
        this.ageRestriction = ageRestriction;
        this.genreIds = genreIds;
        this.movieContributorIds = movieContributorIds;
    }
}
