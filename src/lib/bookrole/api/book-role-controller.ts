import type { BookRoleCreateDto } from './book-role-create-dto';
import type { BookRoleResponseDto } from './book-role-response-dto';
import type { BookRoleUpdateDto } from './book-role-update-dto';

export class BookRoleController {
    readonly MAPPING = '/api/book-role';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllBookRoles(): Promise<BookRoleResponseDto[]> {
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

    async createBookRole(bookRoleCreateDto: BookRoleCreateDto): Promise<BookRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookRoleCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBookRole(bookRoleId: String): Promise<BookRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId, {
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

    async updateBookRole(bookRoleId: String, bookRoleUpdateDto: BookRoleUpdateDto): Promise<BookRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookRoleUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBookRole(bookRoleId: string): Promise<BookRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + bookRoleId, {
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
}
