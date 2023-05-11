export class MovieImportResponseDto {
    httpStatus: number = 200;
    httpMessage: string = 'OK';
    isan: string = '';
    title: string = '';
    year: number = 0;
    playTime: number = 0;
    directorFirstName: string = '';
    directorLastName: string = '';

    constructor(
        httpStatus = 200,
        httpMessage = 'OK',
        isan = '',
        title = '',
        year = 0,
        playTime = 0,
        directorFirstName = '',
        directorLastName = ''
    ) {
        this.httpStatus = httpStatus;
        this.httpMessage = httpMessage;
        this.isan = isan;
        this.title = title;
        this.year = year;
        this.playTime = playTime;
        this.directorFirstName = directorFirstName;
        this.directorLastName = directorLastName;
    }
}
