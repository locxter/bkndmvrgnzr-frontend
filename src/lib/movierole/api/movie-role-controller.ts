import type { ContributorId } from '$lib/contributor/db/contributor-id';
import { MovieRole } from '../db/movie-role';
import type { MovieRoleId } from '../db/movie-role-id';
import type { MovieRoleResponseDto } from './movie-role-response-dto';

export class MovieRoleController {
    readonly MAPPING = '/api/movie-role';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovieRoles(): Promise<MovieRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieRoleResponseDto[]).map((it) => MovieRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createMovieRole(movieRole: MovieRole): Promise<MovieRole> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieRole.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieRole.fromDto(JSON.parse(responseText) as MovieRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovieRole(movieRoleId: MovieRoleId): Promise<MovieRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieRole.fromDto(JSON.parse(responseText) as MovieRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateMovieRole(movieRoleId: MovieRoleId, movieRole: MovieRole): Promise<MovieRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieRole.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieRole.fromDto(JSON.parse(responseText) as MovieRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovieRole(movieRoleId: MovieRoleId): Promise<MovieRole> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieRoleId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieRole.fromDto(JSON.parse(responseText) as MovieRoleResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMovieRolesOfContributor(contributorId: ContributorId): Promise<MovieRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieRoleResponseDto[]).map((it) => MovieRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMovieRolesOfSearchQuery(query: string): Promise<MovieRole[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieRoleResponseDto[]).map((it) => MovieRole.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
