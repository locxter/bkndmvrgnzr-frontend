export class UserDeleteAdminDto {
    username: string = '';

    constructor(username = '') {
        this.username = username;
    }
}
