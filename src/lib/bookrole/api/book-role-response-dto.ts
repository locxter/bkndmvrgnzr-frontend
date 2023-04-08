import type { BookContributorResponseBriefDto } from '$lib/bookcontributor/api/book-contributor-response-brief-dto';

export class BookRoleResponseDto {
    id: string = '';
    name: string = '';
    bookContributors: BookContributorResponseBriefDto[] = [];

    constructor(id = '', name = '', bookContributors: BookContributorResponseBriefDto[] = []) {
        this.id = id;
        this.name = name;
        this.bookContributors = bookContributors;
    }
}
