export class BookRoleCreateDto {
    name: string = '';

    constructor(name = '') {
        this.name = name;
    }
}
