import type { Isbn } from '$lib/book/db/isbn';
import type { BookImportResponseDto } from './book-import-response-dto';

export class BookImportController {
    readonly MAPPING = '/api/book-import';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async importBook(isbn: Isbn): Promise<BookImportResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText) as BookImportResponseDto;
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
