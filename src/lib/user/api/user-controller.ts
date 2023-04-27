import { User } from '../db/user';
import type { UserId } from '../db/user-id';
import type { PasswordUpdateAdminDto } from './password-update-admin-dto';
import type { PasswordUpdateDto } from './password-update-dto';
import type { UserCreateDto } from './user-create-dto';
import type { UserDeleteAdminDto } from './user-delete-admin-dto';
import type { UserDeleteDto } from './user-delete-dto';
import type { UserResponseDto } from './user-response-dto';

export class UserController {
    readonly MAPPING = '/api/user';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getUser(): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllUsers(): Promise<User[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/all', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as UserResponseDto[]).map((it) => User.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getSpecificUser(userId: UserId): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createUser(userCreateDto: UserCreateDto): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateUser(user: User): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateSpecificUser(userId: UserId, user: User): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updatePassword(passwordUpdateDto: PasswordUpdateDto): Promise<User> {
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
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateSpecificUsersPassword(userId: UserId, PasswordUpdateAdminDto: PasswordUpdateAdminDto): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId.value + '/password', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(PasswordUpdateAdminDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteUser(userDeleteDto: UserDeleteDto): Promise<User> {
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
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteSpecificUser(userId: UserId, userDeleteAdminDto: UserDeleteAdminDto): Promise<User> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDeleteAdminDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return User.fromDto(JSON.parse(responseText) as UserResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllUsersOfSearchQuery(query: string): Promise<User[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as UserResponseDto[]).map((it) => User.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
