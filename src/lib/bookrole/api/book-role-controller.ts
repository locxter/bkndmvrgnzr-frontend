import type { ContributorId } from '$lib/contributor/db/contributor-id';
import { BookRole } from '../db/book-role';
import type { BookRoleId } from '../db/book-role-id';
import type { BookRoleResponseDto } from './book-role-response-dto';

export class BookRoleController {
    readonly MAPPING = '/api/book-role';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllBookRoles(): Promise<BookRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookRoleResponseDto[]).map((it) => BookRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createBookRole(bookRole: BookRole): Promise<BookRole> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookRole.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookRole.fromDto(JSON.parse(responseText) as BookRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBookRole(bookRoleId: BookRoleId): Promise<BookRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookRole.fromDto(JSON.parse(responseText) as BookRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateBookRole(bookRoleId: BookRoleId, bookRole: BookRole): Promise<BookRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookRole.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookRole.fromDto(JSON.parse(responseText) as BookRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBookRole(bookRoleId: BookRoleId): Promise<BookRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return BookRole.fromDto(JSON.parse(responseText) as BookRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookRolesOfContributor(contributorId: ContributorId): Promise<BookRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookRoleResponseDto[]).map((it) => BookRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookRolesOfSearchQuery(query: string): Promise<BookRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookRoleResponseDto[]).map((it) => BookRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
