import type { BookCreateDto } from './book-create-dto';
import type { BookResponseDto } from './book-response-dto';
import type { BookUpdateDto } from './book-update-dto';

export class BookController {
    readonly MAPPING = '/api/book';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllBooks(): Promise<BookResponseDto[]> {
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

    async createBook(bookCreateDto: BookCreateDto): Promise<BookResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBook(isbn: String): Promise<BookResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn, {
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

    async updateBook(isbn: String, bookUpdateDto: BookUpdateDto): Promise<BookResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBook(isbn: string): Promise<BookResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn, {
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

    async getAllBooksOfGenre(genreId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/genre/' + genreId, {
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

    async getAllBooksOfPublishingHouse(publishingHouseId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/publishing-house/' + publishingHouseId, {
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

    async getAllBooksOfBookContributor(bookContributorId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/book-contributor/' + bookContributorId, {
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

    async getAllBooksOfContributor(contributorId: string): Promise<BookResponseDto[]> {
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

    async getAllBooksOfSearchQuery(query: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
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

    async getAllBooksOfUser(): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
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

    async addBookToUser(isbn: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isbn, {
            method: 'POST',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async removeBookFromUser(isbn: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isbn, {
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

    async getAllBooksOfGenreFromUser(genreId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/genre/' + genreId, {
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

    async getAllBooksOfPublishingHouseFromUser(publishingHouseId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/publishing-house/' + publishingHouseId, {
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

    async getAllBooksOfBookContributorFromUser(bookContributorId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/book-contributor/' + bookContributorId, {
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

    async getAllBooksOfContributorFromUser(contributorId: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/contributor/' + contributorId, {
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

    async getAllBooksOfSearchQueryFromUser(query: string): Promise<BookResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/search/' + query, {
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
