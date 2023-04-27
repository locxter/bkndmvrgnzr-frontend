import type { ContributorId } from '$lib/contributor/db/contributor-id';
import type { MovieRoleId } from '$lib/movierole/db/movie-role-id';
import { MovieContributor } from '../db/movie-contributor';
import type { MovieContributorId } from '../db/movie-contributor-id';
import type { MovieContributorResponseDto } from './movie-contributor-response-dto';

export class MovieContributorController {
    readonly MAPPING = '/api/movie-contributor';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovieContributors(): Promise<MovieContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieContributorResponseDto[]).map((it) =>
                MovieContributor.fromDto(it)
            );
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createMovieContributor(movieContributor: MovieContributor): Promise<MovieContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieContributor.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieContributor.fromDto(JSON.parse(responseText) as MovieContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovieContributor(movieContributorId: MovieContributorId): Promise<MovieContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieContributor.fromDto(JSON.parse(responseText) as MovieContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateMovieContributor(
        movieContributorId: MovieContributorId,
        movieContributor: MovieContributor
    ): Promise<MovieContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieContributor.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieContributor.fromDto(JSON.parse(responseText) as MovieContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovieContributor(movieContributorId: MovieContributorId): Promise<MovieContributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return MovieContributor.fromDto(JSON.parse(responseText) as MovieContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMovieContributorsOfContributor(contributorId: ContributorId): Promise<MovieContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieContributorResponseDto[]).map((it) =>
                MovieContributor.fromDto(it)
            );
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMovieContributorsOfMovieRole(movieRoleId: MovieRoleId): Promise<MovieContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/movie-role/' + movieRoleId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieContributorResponseDto[]).map((it) =>
                MovieContributor.fromDto(it)
            );
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMovieContributorsOfSearchQuery(query: string): Promise<MovieContributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieContributorResponseDto[]).map((it) =>
                MovieContributor.fromDto(it)
            );
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
