import { BookBrief } from '../../book/db/book-brief';
import { MovieBrief } from '../../movie/db/movie-brief';
import { Role } from '../../role/db/role';
import { UserResponseDto } from '../api/user-response-dto';
import { UserUpdateDto } from '../api/user-update-dto';
import { UserId } from './user-id';

export class User {
    id: UserId = new UserId();
    username: string = '';
    firstName: string = '';
    lastName: string = '';
    roles: Role[] = [];
    books: BookBrief[] = [];
    movies: MovieBrief[] = [];

    constructor(
        id = new UserId(),
        username = '',
        firstName = '',
        lastName = '',
        roles: Role[] = [],
        books: BookBrief[] = [],
        movies: MovieBrief[] = []
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.books = books;
        this.movies = movies;
    }

    toUpdateDto() {
        return new UserUpdateDto(this.username, this.firstName, this.lastName);
    }

    static fromDto(responseDto = new UserResponseDto()) {
        return new User(
            new UserId(responseDto.id),
            responseDto.username,
            responseDto.firstName,
            responseDto.lastName,
            responseDto.roles.map((it) => Role.fromDto(it)),
            responseDto.books.map((it) => BookBrief.fromDto(it)),
            responseDto.movies.map((it) => MovieBrief.fromDto(it))
        );
    }
}
