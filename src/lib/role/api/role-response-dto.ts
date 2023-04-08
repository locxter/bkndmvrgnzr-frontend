import { ERole } from '../db/erole';

export class RoleResponseDto {
    id: string = '';
    type: string = ERole.ROLE_USER.toString();

    constructor(id = '', type = ERole.ROLE_USER.toString()) {
        this.id = id;
        this.type = type;
    }
}
