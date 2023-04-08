export class MovieRoleCreateDto {
    name: string = '';

    constructor(name = '') {
        this.name = name;
    }
}
