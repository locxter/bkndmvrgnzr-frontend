import { Contributor } from '../db/contributor';
import type { ContributorId } from '../db/contributor-id';
import type { ContributorResponseDto } from './contributor-response-dto';

export class ContributorController {
    readonly MAPPING = '/api/contributor';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllContributors(): Promise<Contributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as ContributorResponseDto[]).map((it) => Contributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createContributor(contributor: Contributor): Promise<Contributor> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contributor.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Contributor.fromDto(JSON.parse(responseText) as ContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getContributor(contributorId: ContributorId): Promise<Contributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Contributor.fromDto(JSON.parse(responseText) as ContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updateContributor(contributorId: ContributorId, contributor: Contributor): Promise<Contributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contributor.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return Contributor.fromDto(JSON.parse(responseText) as ContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deleteContributor(contributorId: ContributorId): Promise<Contributor> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + contributorId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return Contributor.fromDto(JSON.parse(responseText) as ContributorResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllContributorsOfSearchQuery(query: string): Promise<Contributor[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as ContributorResponseDto[]).map((it) => Contributor.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
