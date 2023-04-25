import type { BookResponseBriefDto } from '$lib/book/api/book-response-brief-dto';
import type { MovieResponseBriefDto } from '$lib/movie/api/movie-response-brief-dto';
import type { RoleResponseDto } from '$lib/role/api/role-response-dto';

export class UserResponseDto {
    id: string = '';
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    roles: RoleResponseDto[] = [];
    books: BookResponseBriefDto[] = [];
    movies: MovieResponseBriefDto[] = [];

    constructor(
        id = '',
        username = '',
        firstName = '',
        lastName = '',
        roles: RoleResponseDto[] = [],
        books: BookResponseBriefDto[] = [],
        movies: MovieResponseBriefDto[] = []
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.books = books;
        this.movies = movies;
    }
}
