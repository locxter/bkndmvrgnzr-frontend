export class PasswordUpdateDto {
    password: string = '';
    newPassword: string = '';
    confirmNewPassword: string = '';

    constructor(password = '', newPassword = '', confirmNewPassword = '') {
        this.password = password;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }
}
