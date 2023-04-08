import type { ContributorCreateDto } from './contributor-create-dto';
import type { ContributorResponseDto } from './contributor-response-dto';
import type { ContributorUpdateDto } from './contributor-update-dto';

export class ContributorController {
    readonly MAPPING = '/api/contributor';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async getAllContributors(): Promise<ContributorResponseDto[]> {
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

    async createContributor(contributorCreateDto: ContributorCreateDto): Promise<ContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contributorCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getContributor(contributorId: String): Promise<ContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId, {
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

    async updateContributor(
        contributorId: String,
        contributorUpdateDto: ContributorUpdateDto
    ): Promise<ContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contributorUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteContributor(contributorId: string): Promise<ContributorResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId, {
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
