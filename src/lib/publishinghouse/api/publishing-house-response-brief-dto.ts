export class PublishingHouseResponseBriefDto {
    id: string = '';
    name: string = '';
    country: string = '';
    city: string = '';

    constructor(id = '', name = '', country = '', city = '') {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
    }
}
