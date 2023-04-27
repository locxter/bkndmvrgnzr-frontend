import { BookBrief } from '../../book/db/book-brief';
import { PublishingHouseCreateDto } from '../api/publishing-house-create-dto';
import { PublishingHouseResponseDto } from '../api/publishing-house-response-dto';
import { PublishingHouseUpdateDto } from '../api/publishing-house-update-dto';
import { PublishingHouseId } from './publishing-house-id';

export class PublishingHouse {
    id: PublishingHouseId = new PublishingHouseId();
    name: string = '';
    country: string = '';
    city: string = '';
    books: BookBrief[] = [];

    constructor(id = new PublishingHouseId(), name = '', country = '', city = '', books: BookBrief[] = []) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
        this.books = books;
    }

    toCreateDto() {
        return new PublishingHouseCreateDto(this.name, this.country, this.city);
    }

    toUpdateDto() {
        return new PublishingHouseUpdateDto(this.name, this.country, this.city);
    }

    static fromDto(responseDto = new PublishingHouseResponseDto()) {
        return new PublishingHouse(
            new PublishingHouseId(responseDto.id),
            responseDto.name,
            responseDto.country,
            responseDto.city,
            responseDto.books.map((it) => BookBrief.fromDto(it))
        );
    }
}
