import { ERole } from '../db/erole';

export class RoleResponseDto {
    id: string = '';
    type: string = ERole[ERole.ROLE_USER];

    constructor(id = '', type = ERole[ERole.ROLE_USER]) {
        this.id = id;
        this.type = type;
    }
}
