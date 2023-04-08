import { BookRoleResponseBriefDto } from '$lib/bookrole/api/book-role-response-brief-dto';
import { ContributorResponseBriefDto } from '$lib/contributor/api/contributor-response-brief-dto';

export class BookContributorResponseBriefDto {
    id: string = '';
    contributor: ContributorResponseBriefDto = new ContributorResponseBriefDto();
    bookRole: BookRoleResponseBriefDto = new BookRoleResponseBriefDto();

    constructor(id = '', contributor = new ContributorResponseBriefDto(), bookRole = new BookRoleResponseBriefDto()) {
        this.id = id;
        this.contributor = contributor;
        this.bookRole = bookRole;
    }
}
