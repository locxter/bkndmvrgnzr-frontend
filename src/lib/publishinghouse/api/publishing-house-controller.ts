import { PublishingHouse } from '../db/publishing-house';
import type { PublishingHouseId } from '../db/publishing-house-id';
import type { PublishingHouseResponseDto } from './publishing-house-response-dto';

export class PublishingHouseController {
    readonly MAPPING = '/api/publishing-house';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllPublishingHouses(): Promise<PublishingHouse[]> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as PublishingHouseResponseDto[]).map((it) => PublishingHouse.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async createPublishingHouse(publishingHouse: PublishingHouse): Promise<PublishingHouse> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publishingHouse.toCreateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return PublishingHouse.fromDto(JSON.parse(responseText) as PublishingHouseResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getPublishingHouse(publishingHouseId: PublishingHouseId): Promise<PublishingHouse> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId.value, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return PublishingHouse.fromDto(JSON.parse(responseText) as PublishingHouseResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async updatePublishingHouse(
        publishingHouseId: PublishingHouseId,
        publishingHouse: PublishingHouse
    ): Promise<PublishingHouse> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId.value, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publishingHouse.toUpdateDto()),
        });
        let responseText = await response.text();
        if (response.ok) {
            return PublishingHouse.fromDto(JSON.parse(responseText) as PublishingHouseResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deletePublishingHouse(publishingHouseId: PublishingHouseId): Promise<PublishingHouse> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId.value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return PublishingHouse.fromDto(JSON.parse(responseText) as PublishingHouseResponseDto);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getAllPublishingHousesOfSearchQuery(query: string): Promise<PublishingHouse[]> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/search/' + query, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
            },
        });
        let responseText = await response.text();
        if (response.ok) {
            return (JSON.parse(responseText) as PublishingHouseResponseDto[]).map((it) => PublishingHouse.fromDto(it));
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
