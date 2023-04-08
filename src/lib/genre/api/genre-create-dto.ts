export class GenreCreateDto {
    name: string = '';

    constructor(name = '') {
        this.name = name;
    }
}
