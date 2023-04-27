import { BookRoleResponseBriefDto } from '../api/book-role-response-brief-dto';
import { BookRoleId } from './book-role-id';

export class BookRoleBrief {
    id: BookRoleId = new BookRoleId();
    name: string = '';

    constructor(id = new BookRoleId(), name = '') {
        this.id = id;
        this.name = name;
    }

    static fromDto(responseDto = new BookRoleResponseBriefDto()) {
        return new BookRoleBrief(new BookRoleId(responseDto.id), responseDto.name);
    }
}
