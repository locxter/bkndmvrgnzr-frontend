import type { RoleResponseDto } from './role-response-dto';

export class RoleController {
    readonly MAPPING = '/api/role';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllRoles(): Promise<RoleResponseDto[]> {
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

    async getRole(roleId: String): Promise<RoleResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + roleId, {
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

    async getAllRolesOfUser(): Promise<RoleResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user', {
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

    async getAllRolesOfSpecificUser(userId: string): Promise<RoleResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + userId, {
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

    async addRoleToSpecificUser(userId: string, roleId: string): Promise<RoleResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + userId + '/role/' + roleId, {
            method: 'POST',
            credentials: 'include',
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async removeRoleFromSpecificUser(userId: string, roleId: string): Promise<RoleResponseDto[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/user/' + userId + '/role/' + roleId, {
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
