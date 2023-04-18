import type { AuthLoginDto } from './auth-login-dto';

export class AuthController {
    readonly MAPPING = '/api/auth';
    serverAddress: string;

    constructor(serverAddress = '') {
        this.serverAddress = serverAddress;
    }

    async login(authLoginDto: AuthLoginDto): Promise<string> {
        let response = await fetch(this.serverAddress + this.MAPPING, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(authLoginDto),
        });
        let responseText = await response.text();
        if (response.ok) {
            return responseText;
        } else {
            throw new Error('\nStatus: ' + response.status + '\nMessage: ' + responseText);
        }
    }
}
