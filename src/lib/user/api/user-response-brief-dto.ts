export class UserResponseBriefDto {
    id: string = '';
    username: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(id = '', username = '', firstName = '', lastName = '') {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
