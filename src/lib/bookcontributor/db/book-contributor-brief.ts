import { BookRoleBrief } from '../../bookrole/db/book-role-brief';
import { ContributorBrief } from '../../contributor/db/contributor-brief';
import { BookContributorResponseBriefDto } from '../api/book-contributor-response-brief-dto';
import { BookContributorId } from './book-contributor-id';

export class BookContributorBrief {
    id: BookContributorId = new BookContributorId();
    contributor: ContributorBrief = new ContributorBrief();
    bookRole: BookRoleBrief = new BookRoleBrief();

    constructor(id = new BookContributorId(), contributor = new ContributorBrief(), bookRole = new BookRoleBrief()) {
        this.id = id;
        this.contributor = contributor;
        this.bookRole = bookRole;
    }

    static fromDto(responseDto = new BookContributorResponseBriefDto()) {
        return new BookContributorBrief(
            new BookContributorId(responseDto.id),
            ContributorBrief.fromDto(responseDto.contributor),
            BookRoleBrief.fromDto(responseDto.bookRole)
        );
    }
}
