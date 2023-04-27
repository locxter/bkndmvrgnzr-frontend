import { Genre } from '../db/genre';
import type { GenreId } from '../db/genre-id';
import type { GenreResponseDto } from './genre-response-dto';

export class GenreController {
    readonly MAPPING = '/api/genre';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllGenres(): Promise<Genre[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as GenreResponseDto[]).map((it) => Genre.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createGenre(genre: Genre): Promise<Genre> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genre.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Genre.fromDto(JSON.parse(responseText) as GenreResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getGenre(genreId: GenreId): Promise<Genre> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Genre.fromDto(JSON.parse(responseText) as GenreResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateGenre(genreId: GenreId, genre: Genre): Promise<Genre> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genre.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Genre.fromDto(JSON.parse(responseText) as GenreResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteGenre(genreId: GenreId): Promise<Genre> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Genre.fromDto(JSON.parse(responseText) as GenreResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllGenresOfSearchQuery(query: string): Promise<Genre[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as GenreResponseDto[]).map((it) => Genre.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
