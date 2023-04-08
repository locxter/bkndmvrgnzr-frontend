export class MovieResponseBriefDto {
    isan: string = '';
    title: string = '';
    description: string = '';
    year: number = 0;
    playTime: number = 0;
    ageRestriction: number = 0;

    constructor(isan = '', title = '', description = '', year = 0, playTime = 0, ageRestriction = 0) {
        this.isan = isan;
        this.title = title;
        this.description = description;
        this.year = year;
        this.playTime = playTime;
        this.ageRestriction = ageRestriction;
    }
}
