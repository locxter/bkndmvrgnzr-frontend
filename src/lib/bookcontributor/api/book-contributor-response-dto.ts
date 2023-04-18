import type { BookResponseBriefDto } from '$lib/book/api/book-response-brief-dto';
import { BookRoleResponseBriefDto } from '$lib/bookrole/api/book-role-response-brief-dto';
import { ContributorResponseBriefDto } from '$lib/contributor/api/contributor-response-brief-dto';

export class BookContributorResponseDto {
    id: string = '';
    contributor: ContributorResponseBriefDto = new ContributorResponseBriefDto();
    bookRole: BookRoleResponseBriefDto = new BookRoleResponseBriefDto();
    books: BookResponseBriefDto[] = [];

    constructor(
        id = '',
        contributor = new ContributorResponseBriefDto(),
        bookRole = new BookRoleResponseBriefDto(),
        books: BookResponseBriefDto[] = []
    ) {
        this.id = id;
        this.contributor = contributor;
        this.bookRole = bookRole;
        this.books = books;
    }
}
