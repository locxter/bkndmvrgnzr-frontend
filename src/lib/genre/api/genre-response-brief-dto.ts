export class GenreResponseBriefDto {
    id: string = '';
    name: string = '';

    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }
}
