export class BookUpdateDto {
    title: string = '';
    subtitle: string = '';
    description: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouseId: string = '';
    genreIds: string[] = [];
    bookContributorIds: string[] = [];

    constructor(
        title = '',
        subtitle = '',
        description = '',
        year = 0,
        pages = 0,
        publishingHouseId = '',
        genreIds: string[] = [],
        bookContributorIds: string[] = []
    ) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.year = year;
        this.pages = pages;
        this.publishingHouseId = publishingHouseId;
        this.genreIds = genreIds;
        this.bookContributorIds = bookContributorIds;
    }
}
