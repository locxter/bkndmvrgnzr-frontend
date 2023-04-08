export class UserUpdateDto {
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';

    constructor(username = '', password = '', firstName = '', lastName = '') {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
