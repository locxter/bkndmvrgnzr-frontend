import type { PasswordUpdateAdminDto } from './password-update-admin-dto';
import type { PasswordUpdateDto } from './password-update-dto';
import type { UserCreateDto } from './user-create-dto';
import type { UserDeleteAdminDto } from './user-delete-admin-dto';
import type { UserDeleteDto } from './user-delete-dto';
import type { UserResponseDto } from './user-response-dto';
import type { UserUpdateDto } from './user-update-dto';

export class UserController {
    readonly MAPPING = '/api/user';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getUser(): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllUsers(): Promise<UserResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/all', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getSpecificUser(userId: string): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateUser(userUpdateDto: UserUpdateDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateSpecificUser(userId: string, userUpdateDto: UserUpdateDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updatePassword(passwordUpdateDto: PasswordUpdateDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/password', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateSpecificUsersPassword(
        userId: string,
        PasswordUpdateAdminDto: PasswordUpdateAdminDto
    ): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId + '/password', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PasswordUpdateAdminDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteUser(userDeleteDto: UserDeleteDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDeleteDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteSpecificUser(userId: string, userDeleteAdminDto: UserDeleteAdminDto): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDeleteAdminDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllUsersOfSearchQuery(query: string): Promise<UserResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
