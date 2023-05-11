export class MovieImportResponseBriefDto {
    isan: string = '';
    title: string = '';
    year: number = 0;
    directorFirstName: string = '';
    directorLastName: string = '';

    constructor(isan = '', title = '', year = 0, directorFirstName = '', directorLastName = '') {
        this.isan = isan;
        this.title = title;
        this.year = year;
        this.directorFirstName = directorFirstName;
        this.directorLastName = directorLastName;
    }
}
