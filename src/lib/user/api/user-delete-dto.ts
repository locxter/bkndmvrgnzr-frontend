export class UserDeleteDto {
    username: string = '';
    password: string = '';
    confirmPassword: string = '';

    constructor(username = '', password = '', confirmPassword = '') {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
