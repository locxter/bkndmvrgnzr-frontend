export class PublishingHouseCreateDto {
    name: string = '';
    country: string = '';
    city: string = '';

    constructor(name = '', country = '', city = '') {
        this.name = name;
        this.country = country;
        this.city = city;
    }
}
