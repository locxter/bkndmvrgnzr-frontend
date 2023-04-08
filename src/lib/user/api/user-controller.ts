import type { UserCreateDto } from './user-create-dto';
import type { UserResponseDto } from './user-response-dto';
import type { UserUpdateDto } from './user-update-dto';

export class UserController {
    readonly MAPPING = '/api/user';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getUser(): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
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
            credentials: 'include',
            headers: {
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
            credentials: 'include',
            headers: {
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

    async deleteUser(): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'DELETE',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteSpecificUser(userId: string): Promise<UserResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + userId, {
            method: 'DELETE',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
