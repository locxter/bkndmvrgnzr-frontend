import type { BookContributorCreateDto } from './book-contributor-create-dto';
import type { BookContributorResponseDto } from './book-contributor-response-dto';
import type { BookContributorUpdateDto } from './book-contributor-update-dto';

export class BookContributorController {
    readonly MAPPING = '/api/book-contributor';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllBookContributors(): Promise<BookContributorResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createBookContributor(
        bookContributorCreateDto: BookContributorCreateDto
    ): Promise<BookContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookContributorCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBookContributor(bookContributorId: String): Promise<BookContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId, {
            method: 'GET',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateBookContributor(
        bookContributorId: String,
        bookContributorUpdateDto: BookContributorUpdateDto
    ): Promise<BookContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookContributorUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBookContributor(bookContributorId: string): Promise<BookContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookContributorId, {
            method: 'DELETE',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookContributorsOfContributor(contributorId: string): Promise<BookContributorResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId, {
            method: 'GET',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBookContributorsOfBookRole(bookRoleId: string): Promise<BookContributorResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/book-role/' + bookRoleId, {
            method: 'GET',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
