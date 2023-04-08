import { PublishingHouseResponseBriefDto } from '$lib/publishinghouse/api/PublishingHouseResponseBriefDto';

export class BookResponseBriefDto {
    isbn: string = '';
    title: string = '';
    subtitle: string = '';
    description: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouse: PublishingHouseResponseBriefDto = new PublishingHouseResponseBriefDto();

    constructor(
        isbn = '',
        title = '',
        subtitle = '',
        description = '',
        year = 0,
        pages = 0,
        publishingHouse = new PublishingHouseResponseBriefDto()
    ) {
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.year = year;
        this.pages = pages;
        this.publishingHouse = publishingHouse;
    }
}
