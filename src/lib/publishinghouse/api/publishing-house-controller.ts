import type { PublishingHouseCreateDto } from './publishing-house-create-dto';
import type { PublishingHouseResponseDto } from './publishing-house-response-dto';
import type { PublishingHouseUpdateDto } from './publishing-house-update-dto';

export class PublishingHouseController {
    readonly MAPPING = '/api/publishing-house';
    serverAddress: string;
    jwt: string;

    constructor(serverAddress = '', jwt = '') {
        this.serverAddress = serverAddress;
        this.jwt = jwt;
    }

    async getAllPublishingHouses(): Promise<PublishingHouseResponseDto[]> {
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

    async createPublishingHouse(
        publishingHouseCreateDto: PublishingHouseCreateDto
    ): Promise<PublishingHouseResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publishingHouseCreateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async getPublishingHouse(publishingHouseId: String): Promise<PublishingHouseResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId, {
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

    async updatePublishingHouse(
        publishingHouseId: String,
        publishingHouseUpdateDto: PublishingHouseUpdateDto
    ): Promise<PublishingHouseResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + this.jwt,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publishingHouseUpdateDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return JSON.parse(responseText);
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }

    async deletePublishingHouse(publishingHouseId: string): Promise<PublishingHouseResponseDto> {
        let response = await fetch(this.serverAddress + this.MAPPING + '/' + publishingHouseId, {
            method: 'DELETE',
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
