import { Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/database/entities';
import { RolesService } from '../../Services/roles/roles.service';

@Resolver(() => Role)
export class RolesResolver {
    constructor(private roleService: RolesService) {}

    @Query(() => [Role], {name: 'roles'})
    async findRole(): Promise<Role[]> {
        return this.roleService.findRole();
    }
}
