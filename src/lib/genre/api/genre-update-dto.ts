export class GenreUpdateDto {
    name: string = '';

    constructor(name = '') {
        this.name = name;
    }
}
