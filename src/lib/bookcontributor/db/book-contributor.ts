import { BookBrief } from '../../book/db/book-brief';
import { BookRoleBrief } from '../../bookrole/db/book-role-brief';
import { ContributorBrief } from '../../contributor/db/contributor-brief';
import { BookContributorCreateDto } from '../api/book-contributor-create-dto';
import { BookContributorResponseDto } from '../api/book-contributor-response-dto';
import { BookContributorUpdateDto } from '../api/book-contributor-update-dto';
import { BookContributorId } from './book-contributor-id';

export class BookContributor {
    id: BookContributorId = new BookContributorId();
    contributor: ContributorBrief = new ContributorBrief();
    bookRole: BookRoleBrief = new BookRoleBrief();
    books: BookBrief[] = [];

    constructor(
        id = new BookContributorId(),
        contributor = new ContributorBrief(),
        bookRole = new BookRoleBrief(),
        books: BookBrief[] = []
    ) {
        this.id = id;
        this.contributor = contributor;
        this.bookRole = bookRole;
        this.books = books;
    }

    toCreateDto() {
        return new BookContributorCreateDto(this.contributor.id.value, this.bookRole.id.value);
    }

    toUpdateDto() {
        return new BookContributorUpdateDto(this.contributor.id.value, this.bookRole.id.value);
    }

    static fromDto(responseDto = new BookContributorResponseDto()) {
        return new BookContributor(
            new BookContributorId(responseDto.id),
            ContributorBrief.fromDto(responseDto.contributor),
            BookRoleBrief.fromDto(responseDto.bookRole),
            responseDto.books.map((it) => BookBrief.fromDto(it))
        );
    }
}
