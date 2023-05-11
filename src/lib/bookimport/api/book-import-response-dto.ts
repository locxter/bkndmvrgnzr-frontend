export class BookImportResponseDto {
    httpStatus: number = 200;
    httpMessage: string = 'OK';
    isbn: string = '';
    title: string = '';
    subtitle: string = '';
    year: number = 0;
    pages: number = 0;
    publishingHouseName: string = '';
    authorFirstName: string = '';
    authorLastName: string = '';

    constructor(
        httpStatus = 200,
        httpMessage = 'OK',
        isbn = '',
        title = '',
        subtitle = '',
        year = 0,
        pages = 0,
        publishingHouseName = '',
        authorFirstName = '',
        authorLastName = ''
    ) {
        this.httpStatus = httpStatus;
        this.httpMessage = httpMessage;
        this.isbn = isbn;
        this.title = title;
        this.subtitle = subtitle;
        this.year = year;
        this.pages = pages;
        this.publishingHouseName = publishingHouseName;
        this.authorFirstName = authorFirstName;
        this.authorLastName = authorLastName;
    }
}
