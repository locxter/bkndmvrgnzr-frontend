export class UserResponseBriefDto {
    id: string = '';
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(id = '', username = '', password = '', firstName = '', lastName = '') {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
