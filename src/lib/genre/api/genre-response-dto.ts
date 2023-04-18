import type { BookResponseBriefDto } from '$lib/book/api/book-response-brief-dto';
import type { MovieResponseBriefDto } from '$lib/movie/api/movie-response-brief-dto';

export class GenreResponseDto {
    id: string = '';
    name: string = '';
    books: BookResponseBriefDto[] = [];
    movies: MovieResponseBriefDto[] = [];

    constructor(id = '', name = '', books: BookResponseBriefDto[] = [], movies: MovieResponseBriefDto[] = []) {
        this.id = id;
        this.name = name;
        this.books = books;
        this.movies = movies;
    }
}
