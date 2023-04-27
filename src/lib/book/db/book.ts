import { BookContributorBrief } from '../../bookcontributor/db/book-contributor-brief';
import { GenreBrief } from '../../genre/db/genre-brief';
import { PublishingHouseBrief } from '../../publishinghouse/db/publishing-house-brief';
import { BookCreateDto } from '../api/book-create-dto';
import { BookResponseDto } from '../api/book-response-dto';
import { BookUpdateDto } from '../api/book-update-dto';
import { Isbn } from './isbn';

export class Book {
    isbn: Isbn = new Isbn();
    title: string = '';
    subtitle: string = '';
    description: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouse: PublishingHouseBrief = new PublishingHouseBrief();
    genres: GenreBrief[] = [];
    bookContributors: BookContributorBrief[] = [];

    constructor(
        isbn = new Isbn(),
        title = '',
        subtitle = '',
        description = '',
        year = 0,
        pages = 0,
        publishingHouse = new PublishingHouseBrief(),
        genres: GenreBrief[] = [],
        bookContributors: BookContributorBrief[] = []
    ) {
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.year = year;
        this.pages = pages;
        this.publishingHouse = publishingHouse;
        this.genres = genres;
        this.bookContributors = bookContributors;
    }

    toCreateDto() {
        return new BookCreateDto(
            this.isbn.value,
            this.title,
            this.subtitle,
            this.description,
            this.year,
            this.pages,
            this.publishingHouse.id.value,
            this.genres.map((it) => it.id.value),
            this.bookContributors.map((it) => it.id.value)
        );
    }

    toUpdateDto() {
        return new BookUpdateDto(
            this.title,
            this.subtitle,
            this.description,
            this.year,
            this.pages,
            this.publishingHouse.id.value,
            this.genres.map((it) => it.id.value),
            this.bookContributors.map((it) => it.id.value)
        );
    }

    static fromDto(responseDto = new BookResponseDto()) {
        return new Book(
            new Isbn(responseDto.isbn),
            responseDto.title,
            responseDto.subtitle,
            responseDto.description,
            responseDto.year,
            responseDto.pages,
            PublishingHouseBrief.fromDto(responseDto.publishingHouse),
            responseDto.genres.map((it) => GenreBrief.fromDto(it)),
            responseDto.bookContributors.map((it) => BookContributorBrief.fromDto(it))
        );
    }
}
