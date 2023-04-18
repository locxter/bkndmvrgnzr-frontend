import type { MovieCreateDto } from './movie-create-dto';
import type { MovieResponseDto } from './movie-response-dto';
import type { MovieUpdateDto } from './movie-update-dto';

export class MovieController {
    readonly MAPPING = '/api/movie';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovies(): Promise<MovieResponseDto[]> {
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

    async createMovie(movieCreateDto: MovieCreateDto): Promise<MovieResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovie(isan: String): Promise<MovieResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan, {
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

    async updateMovie(isan: String, movieUpdateDto: MovieUpdateDto): Promise<MovieResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovie(isan: string): Promise<MovieResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan, {
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

    async getAllMoviesOfGenre(genreId: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/genre/' + genreId, {
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

    async getAllMoviesOfMovieContributor(movieContributorId: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/movie-contributor/' + movieContributorId, {
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

    async getAllMoviesOfContributor(contributorId: string): Promise<MovieResponseDto[]> {
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

    async getAllMoviesOfSearchQuery(query: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
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

    async getAllMoviesOfUser(): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
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

    async addMovieToUser(isan: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isan, {
            method: 'POST',
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

    async removeMovieFromUser(isan: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isan, {
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

    async getAllMoviesOfGenreFromUser(genreId: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/genre/' + genreId, {
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

    async getAllMoviesOfMovieContributorFromUser(movieContributorId: string): Promise<MovieResponseDto[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/movie-contributor/' + movieContributorId,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfContributorFromUser(contributorId: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/contributor/' + contributorId, {
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

    async getAllMoviesOfSearchQueryFromUser(query: string): Promise<MovieResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/search/' + query, {
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
