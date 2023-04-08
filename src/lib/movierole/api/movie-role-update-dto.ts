export class MovieRoleUpdateDto {
    name: string = '';

    constructor(name = '') {
        this.name = name;
    }
}
