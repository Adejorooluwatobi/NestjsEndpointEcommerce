import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/roles.entity';
import { CreateRoleParams, UpdateRoleParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {}

    async createRole(roleDetails: CreateRoleParams) {
    if (!roleDetails.roleName) {
        throw new Error('Role is required');
    }
    const existingRole = await this.roleRepository.findOneBy({roleName: roleDetails.roleName});
    if (existingRole) {
        throw new ConflictException(`${roleDetails.roleName} already exists`);
    }

    const newRole = this.roleRepository.create({...roleDetails, createdAt: new Date(), updatedAt: new Date()})
    const savedRole = await this.roleRepository.save(newRole);
    console.log(`Role created successfully with the ID: ${savedRole.id}`);
    return savedRole;
}

findRole() {
    return this.roleRepository.find();
}

findRoleById(id: string) {
    return this.roleRepository.findOne({where: {id}});
}

async updateRole(id: string, updateRoleDetails: UpdateRoleParams) {
    return this.roleRepository.update(id, {...updateRoleDetails, updatedAt: new Date() });
}

deleteRole(id: string) {
    return this.roleRepository.delete(id);
}
}
