import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './services/roles/roles.service';
import { Role } from 'src/database/entities/roles.entity'
import { RolesController } from './controllers/roles/roles.controller';
import { StaffRole } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Role, StaffRole])],
  controllers: [RolesController],
  providers: [RolesResolver, RolesService],
  exports: [RolesService]
})
export class RolesModule {}
