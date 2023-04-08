import type { BookResponseBriefDto } from '$lib/book/api/BookResponseBriefDto';
import { BookRoleResponseBriefDto } from '$lib/bookrole/api/BookRoleResponseBriefDto';
import { ContributorResponseBriefDto } from '$lib/contributor/api/ContributorResponseBriefDto';

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
