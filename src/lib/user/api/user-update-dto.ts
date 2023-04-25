export class UserUpdateDto {
    username: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(username = '', firstName = '', lastName = '') {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
