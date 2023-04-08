import type { GenreCreateDto } from './genre-create-dto';
import type { GenreResponseDto } from './genre-response-dto';
import type { GenreUpdateDto } from './genre-update-dto';

export class GenreController {
    readonly MAPPING = '/api/genre';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllGenres(): Promise<GenreResponseDto[]> {
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

    async createGenre(genreCreateDto: GenreCreateDto): Promise<GenreResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genreCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getGenre(genreId: String): Promise<GenreResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId, {
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

    async updateGenre(genreId: String, genreUpdateDto: GenreUpdateDto): Promise<GenreResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genreUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteGenre(genreId: string): Promise<GenreResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + genreId, {
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
