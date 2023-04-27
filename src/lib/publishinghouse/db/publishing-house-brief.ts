import { PublishingHouseResponseBriefDto } from '../api/publishing-house-response-brief-dto';
import { PublishingHouseId } from './publishing-house-id';

export class PublishingHouseBrief {
    id: PublishingHouseId = new PublishingHouseId();
    name: string = '';
    country: string = '';
    city: string = '';

    constructor(id = new PublishingHouseId(), name = '', country = '', city = '') {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
    }

    static fromDto(responseDto = new PublishingHouseResponseBriefDto()) {
        return new PublishingHouseBrief(
            new PublishingHouseId(responseDto.id),
            responseDto.name,
            responseDto.country,
            responseDto.city
        );
    }
}
