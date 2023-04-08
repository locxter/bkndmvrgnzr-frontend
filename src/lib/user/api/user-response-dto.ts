import type { BookResponseBriefDto } from '$lib/book/api/BookResponseBriefDto';
import type { MovieResponseBriefDto } from '$lib/movie/api/MovieResponseBriefDto';
import type { RoleResponseDto } from '$lib/role/api/RoleResponseDto';

export class UserResponseDto {
    id: string = '';
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    roles: RoleResponseDto[] = [];
    books: BookResponseBriefDto[] = [];
    movies: MovieResponseBriefDto[] = [];

    constructor(
        id = '',
        username = '',
        password = '',
        firstName = '',
        lastName = '',
        roles: RoleResponseDto[] = [],
        books: BookResponseBriefDto[] = [],
        movies: MovieResponseBriefDto[] = []
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.books = books;
        this.movies = movies;
    }
}
