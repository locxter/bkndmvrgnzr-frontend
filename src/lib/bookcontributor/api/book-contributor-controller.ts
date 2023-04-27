import type { BookRoleId } from '$lib/bookrole/db/book-role-id';
import type { ContributorId } from '$lib/contributor/db/contributor-id';
import { BookContributor } from '../db/book-contributor';
import type { BookContributorId } from '../db/book-contributor-id';
import type { BookContributorResponseDto } from './book-contributor-response-dto';

export class BookContributorController {
    readonly MAPPING = '/api/book-contributor';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllBookContributors(): Promise<BookContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookContributorResponseDto[]).map((it) => BookContributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createBookContributor(bookContributor: BookContributor): Promise<BookContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookContributor.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookContributor.fromDto(JSON.parse(responseText) as BookContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBookContributor(bookContributorId: BookContributorId): Promise<BookContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookContributor.fromDto(JSON.parse(responseText) as BookContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateBookContributor(
        bookContributorId: BookContributorId,
        bookContributor: BookContributor
    ): Promise<BookContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookContributor.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookContributor.fromDto(JSON.parse(responseText) as BookContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBookContributor(bookContributorId: BookContributorId): Promise<BookContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookContributor.fromDto(JSON.parse(responseText) as BookContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookContributorsOfContributor(contributorId: ContributorId): Promise<BookContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookContributorResponseDto[]).map((it) => BookContributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookContributorsOfBookRole(bookRoleId: BookRoleId): Promise<BookContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/book-role/' + bookRoleId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookContributorResponseDto[]).map((it) => BookContributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookContributorsOfSearchQuery(query: string): Promise<BookContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookContributorResponseDto[]).map((it) => BookContributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
