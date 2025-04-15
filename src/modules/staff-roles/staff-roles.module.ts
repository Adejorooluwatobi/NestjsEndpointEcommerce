import { Module } from '@nestjs/common';
import { StaffRolesResolver } from './staff-roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRole } from 'src/database/entities/staffRoles.entity';
import { StaffRolesController } from './controllers/staff-roles/staff-roles.controller';
import { StaffRolesService } from './services/staff-roles/staff-roles.service';
import { Role, StaffAccount } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StaffRole, Role, StaffAccount])],
  controllers: [StaffRolesController],
  providers: [StaffRolesResolver, StaffRolesService],
  exports: [StaffRolesService]
})
export class StaffRolesModule {}
