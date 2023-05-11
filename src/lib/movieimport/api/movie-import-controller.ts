import type { Isan } from '$lib/movie/db/isan';
import type { MovieImportResponseDto } from './movie-import-response-dto';
import type { MovieImportSearchResponseDto } from './movie-import-search-response-dto';

export class MovieImportController {
    readonly MAPPING = '/api/movie-import';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async importMovie(isan: Isan): Promise<MovieImportResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText) as MovieImportResponseDto;
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async searchMovie(query: string): Promise<MovieImportSearchResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText) as MovieImportSearchResponseDto;
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
