import { RoleResponseDto } from '../api/role-response-dto';
import { ERole } from './erole';
import { RoleId } from './role-id';

export class Role {
    id: RoleId = new RoleId();
    type: ERole = ERole.ROLE_USER;

    constructor(id = new RoleId(), type = ERole.ROLE_USER) {
        this.id = id;
        this.type = type;
    }

    static fromDto(responseDto = new RoleResponseDto()) {
        return new Role(new RoleId(responseDto.id), ERole[responseDto.type as keyof typeof ERole]);
    }
}
