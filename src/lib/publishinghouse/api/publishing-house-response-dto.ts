import type { BookResponseBriefDto } from '$lib/book/api/book-response-brief-dto';

export class PublishingHouseResponseDto {
    id: string = '';
    name: string = '';
    country: string = '';
    city: string = '';
    books: BookResponseBriefDto[] = [];

    constructor(id = '', name = '', country = '', city = '', books: BookResponseBriefDto[] = []) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
        this.books = books;
    }
}
