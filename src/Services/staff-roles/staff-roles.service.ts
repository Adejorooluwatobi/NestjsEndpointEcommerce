import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/roles.entity';
import { StaffAccount } from 'src/database/entities/staffAccounts.entity';
import { StaffRole } from 'src/database/entities/staffRoles.entity';
import { CreateStaffRoleParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class StaffRolesService {
    constructor(
        @InjectRepository(StaffRole) private readonly staffRoleRepository: Repository<StaffRole>,
        @InjectRepository(StaffAccount) private staffRepository: Repository<StaffAccount>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ) {}

    async createStaffRole(staffRoleDetails: CreateStaffRoleParams) {
        const existingStaffRole = await this.staffRoleRepository.findOne({
            where: { staffId: staffRoleDetails.staffId, roleId: staffRoleDetails.roleId },
    });
            if (existingStaffRole) {
                throw new ConflictException(`${staffRoleDetails.staffId} already has the role of ${staffRoleDetails.roleId}`);
            }

            const newStaffRole = this.staffRoleRepository.create({...staffRoleDetails})
            const savedStaffRole = await this.staffRoleRepository.save(newStaffRole);
            console.log(`${staffRoleDetails.staffId} has been asigned the role of ${staffRoleDetails.roleId}  with the ID: ${savedStaffRole.id}`);
            return savedStaffRole;
    }

    findStaffRole() {
        return this.staffRoleRepository.find({relations: ['staff-account']});
    }
}
