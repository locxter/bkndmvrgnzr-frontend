import { BookBrief } from '../../book/db/book-brief';
import { MovieBrief } from '../../movie/db/movie-brief';
import { GenreCreateDto } from '../api/genre-create-dto';
import { GenreResponseDto } from '../api/genre-response-dto';
import { GenreUpdateDto } from '../api/genre-update-dto';
import { GenreId } from './genre-id';

export class Genre {
    id: GenreId = new GenreId();
    name: string = '';
    books: BookBrief[] = [];
    movies: MovieBrief[] = [];

    constructor(id = new GenreId(), name = '', books: BookBrief[] = [], movies: MovieBrief[] = []) {
        this.id = id;
        this.name = name;
        this.books = books;
        this.movies = movies;
    }

    toCreateDto() {
        return new GenreCreateDto(this.name);
    }

    toUpdateDto() {
        return new GenreUpdateDto(this.name);
    }

    static fromDto(responseDto = new GenreResponseDto()) {
        return new Genre(
            new GenreId(responseDto.id),
            responseDto.name,
            responseDto.books.map((it) => BookBrief.fromDto(it)),
            responseDto.movies.map((it) => MovieBrief.fromDto(it))
        );
    }
}
