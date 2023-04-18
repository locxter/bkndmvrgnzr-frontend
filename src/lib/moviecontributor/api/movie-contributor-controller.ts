import type { MovieContributorCreateDto } from './movie-contributor-create-dto';
import type { MovieContributorResponseDto } from './movie-contributor-response-dto';
import type { MovieContributorUpdateDto } from './movie-contributor-update-dto';

export class MovieContributorController {
    readonly MAPPING = '/api/movie-contributor';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovieContributors(): Promise<MovieContributorResponseDto[]> {
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

    async createMovieContributor(
        movieContributorCreateDto: MovieContributorCreateDto
    ): Promise<MovieContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieContributorCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovieContributor(movieContributorId: String): Promise<MovieContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId, {
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

    async updateMovieContributor(
        movieContributorId: String,
        movieContributorUpdateDto: MovieContributorUpdateDto
    ): Promise<MovieContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieContributorUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovieContributor(movieContributorId: string): Promise<MovieContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + movieContributorId, {
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

    async getAllMovieContributorsOfContributor(contributorId: string): Promise<MovieContributorResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId, {
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

    async getAllMovieContributorsOfMovieRole(movieRoleId: string): Promise<MovieContributorResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/movie-role/' + movieRoleId, {
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
}
