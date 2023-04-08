import type { BookContributorResponseBriefDto } from '$lib/bookcontributor/api/BookContributorResponseBriefDto';
import type { GenreResponseBriefDto } from '$lib/genre/api/GenreResponseBriefDto';
import { PublishingHouseResponseBriefDto } from '$lib/publishinghouse/api/PublishingHouseResponseBriefDto';

export class BookResponseDto {
    isbn: string = '';
    title: string = '';
    subtitle: string = '';
    description: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouse: PublishingHouseResponseBriefDto = new PublishingHouseResponseBriefDto();
    genres: GenreResponseBriefDto[] = [];
    bookContributors: BookContributorResponseBriefDto[] = [];

    constructor(
        isbn = '',
        title = '',
        subtitle = '',
        description = '',
        year = 0,
        pages = 0,
        publishingHouse = new PublishingHouseResponseBriefDto(),
        genres: GenreResponseBriefDto[] = [],
        bookContributors: BookContributorResponseBriefDto[] = []
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
}
