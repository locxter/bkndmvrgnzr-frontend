import type { MovieRoleCreateDto } from './movie-role-create-dto';
import type { MovieRoleResponseDto } from './movie-role-response-dto';
import type { MovieRoleUpdateDto } from './movie-role-update-dto';

export class MovieRoleController {
    readonly MAPPING = '/api/movie-role';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovieRoles(): Promise<MovieRoleResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createMovieRole(movieRoleCreateDto: MovieRoleCreateDto): Promise<MovieRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieRoleCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovieRole(movieRoleId: String): Promise<MovieRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateMovieRole(movieRoleId: String, movieRoleUpdateDto: MovieRoleUpdateDto): Promise<MovieRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieRoleUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovieRole(movieRoleId: string): Promise<MovieRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
