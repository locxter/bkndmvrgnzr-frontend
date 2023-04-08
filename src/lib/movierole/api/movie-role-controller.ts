import type { MovieRoleCreateDto } from './movie-role-create-dto';
import type { MovieRoleResponseDto } from './movie-role-response-dto';
import type { MovieRoleUpdateDto } from './movie-role-update-dto';

export class MovieRoleController {
    readonly MAPPING = '/api/movie-role';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllMovieRoles(): Promise<MovieRoleResponseDto[]> {
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

    async createMovieRole(movieRoleCreateDto: MovieRoleCreateDto): Promise<MovieRoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
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
            credentials: 'include',
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
            credentials: 'include',
            headers: {
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
