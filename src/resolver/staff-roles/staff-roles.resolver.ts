import { Query, Resolver } from '@nestjs/graphql';
import { StaffRole } from 'src/database/entities';
import { StaffRolesService } from '../../Services/staff-roles/staff-roles.service';

@Resolver(() => StaffRole)
export class StaffRolesResolver {
    constructor(private staffRoleService: StaffRolesService) {}
    
    @Query(() => [StaffRole], {name: 'staffRoles'})
    async findRole(): Promise<StaffRole[]> {
        return this.staffRoleService.findStaffRole();
    }
}
