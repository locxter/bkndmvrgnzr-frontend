export class MovieRoleResponseBriefDto {
    id: string = '';
    name: string = '';

    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }
}
