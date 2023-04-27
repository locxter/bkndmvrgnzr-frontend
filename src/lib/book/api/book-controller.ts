import type { BookContributorId } from '$lib/bookcontributor/db/book-contributor-id';
import type { ContributorId } from '$lib/contributor/db/contributor-id';
import type { GenreId } from '$lib/genre/db/genre-id';
import type { PublishingHouseId } from '$lib/publishinghouse/db/publishing-house-id';
import { Book } from '../db/book';
import type { Isbn } from '../db/isbn';
import type { BookResponseDto } from './book-response-dto';

export class BookController {
    readonly MAPPING = '/api/book';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllBooks(): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createBook(book: Book): Promise<Book> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Book.fromDto(JSON.parse(responseText) as BookResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getBook(isbn: Isbn): Promise<Book> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Book.fromDto(JSON.parse(responseText) as BookResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateBook(isbn: Isbn, book: Book): Promise<Book> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Book.fromDto(JSON.parse(responseText) as BookResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteBook(isbn: Isbn): Promise<Book> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isbn.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Book.fromDto(JSON.parse(responseText) as BookResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfGenre(genreId: GenreId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/genre/' + genreId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfPublishingHouse(publishingHouseId: PublishingHouseId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/publishing-house/' + publishingHouseId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfBookContributor(bookContributorId: BookContributorId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/book-contributor/' + bookContributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfContributor(contributorId: ContributorId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfSearchQuery(query: string): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfUser(): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async addBookToUser(isbn: Isbn): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isbn.value, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async removeBookFromUser(isbn: Isbn): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isbn.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfGenreFromUser(genreId: GenreId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/genre/' + genreId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfPublishingHouseFromUser(publishingHouseId: PublishingHouseId): Promise<Book[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/publishing-house/' + publishingHouseId.value,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfBookContributorFromUser(bookContributorId: BookContributorId): Promise<Book[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/book-contributor/' + bookContributorId.value,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfContributorFromUser(contributorId: ContributorId): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllBooksOfSearchQueryFromUser(query: string): Promise<Book[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as BookResponseDto[]).map((it) => Book.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
