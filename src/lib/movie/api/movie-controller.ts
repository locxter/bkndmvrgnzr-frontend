import type { ContributorId } from '$lib/contributor/db/contributor-id';
import type { GenreId } from '$lib/genre/db/genre-id';
import type { MovieContributorId } from '$lib/moviecontributor/db/movie-contributor-id';
import type { Isan } from '../db/isan';
import { Movie } from '../db/movie';
import type { MovieResponseDto } from './movie-response-dto';

export class MovieController {
    readonly MAPPING = '/api/movie';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllMovies(): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createMovie(movie: Movie): Promise<Movie> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Movie.fromDto(JSON.parse(responseText) as MovieResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getMovie(isan: Isan): Promise<Movie> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Movie.fromDto(JSON.parse(responseText) as MovieResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateMovie(isan: Isan, movie: Movie): Promise<Movie> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Movie.fromDto(JSON.parse(responseText) as MovieResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteMovie(isan: Isan): Promise<Movie> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + isan.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Movie.fromDto(JSON.parse(responseText) as MovieResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfGenre(genreId: GenreId): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/genre/' + genreId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfMovieContributor(movieContributorId: MovieContributorId): Promise<Movie[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/movie-contributor/' + movieContributorId.value,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfContributor(contributorId: ContributorId): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfSearchQuery(query: string): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfUser(): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async addMovieToUser(isan: Isan): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isan.value, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async removeMovieFromUser(isan: Isan): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + isan.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfGenreFromUser(genreId: GenreId): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/genre/' + genreId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfMovieContributorFromUser(movieContributorId: MovieContributorId): Promise<Movie[]> {
        let response = await fetch(
            this.serverAddress + this.MAPPING + '/user/movie-contributor/' + movieContributorId.value,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.jwt,
                },
            }
        );
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfContributorFromUser(contributorId: ContributorId): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/contributor/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllMoviesOfSearchQueryFromUser(query: string): Promise<Movie[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as MovieResponseDto[]).map((it) => Movie.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
