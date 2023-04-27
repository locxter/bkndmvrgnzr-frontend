import { PublishingHouseBrief } from '../../publishinghouse/db/publishing-house-brief';
import { BookResponseBriefDto } from '../api/book-response-brief-dto';
import { Isbn } from './isbn';

export class BookBrief {
    isbn: Isbn = new Isbn();
    title: string = '';
    subtitle: string = '';
    description: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouse: PublishingHouseBrief = new PublishingHouseBrief();

    constructor(
        isbn = new Isbn(),
        title = '',
        subtitle = '',
        description = '',
        year = 0,
        pages = 0,
        publishingHouse = new PublishingHouseBrief()
    ) {
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.year = year;
        this.pages = pages;
        this.publishingHouse = publishingHouse;
    }

    static fromDto(responseDto = new BookResponseBriefDto()) {
        return new BookBrief(
            new Isbn(responseDto.isbn),
            responseDto.title,
            responseDto.subtitle,
            responseDto.description,
            responseDto.year,
            responseDto.pages,
            PublishingHouseBrief.fromDto(responseDto.publishingHouse)
        );
    }
}
