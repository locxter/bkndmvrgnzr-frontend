export class PasswordUpdateAdminDto {
    newPassword: string = '';
    confirmNewPassword: string = '';

    constructor(newPassword = '', confirmNewPassword = '') {
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }
}
