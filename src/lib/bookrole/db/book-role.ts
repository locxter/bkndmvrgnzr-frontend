import { BookContributorBrief } from '../../bookcontributor/db/book-contributor-brief';
import { BookRoleCreateDto } from '../api/book-role-create-dto';
import { BookRoleResponseDto } from '../api/book-role-response-dto';
import { BookRoleUpdateDto } from '../api/book-role-update-dto';
import { BookRoleId } from './book-role-id';

export class BookRole {
    id: BookRoleId = new BookRoleId();
    name: string = '';
    bookContributors: BookContributorBrief[] = [];

    constructor(id = new BookRoleId(), name = '', bookContributors: BookContributorBrief[] = []) {
        this.id = id;
        this.name = name;
        this.bookContributors = bookContributors;
    }

    toCreateDto() {
        return new BookRoleCreateDto(this.name);
    }

    toUpdateDto() {
        return new BookRoleUpdateDto(this.name);
    }

    static fromDto(responseDto = new BookRoleResponseDto()) {
        return new BookRole(
            new BookRoleId(responseDto.id),
            responseDto.name,
            responseDto.bookContributors.map((it) => BookContributorBrief.fromDto(it))
        );
    }
}
