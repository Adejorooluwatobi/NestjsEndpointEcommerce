import { Module } from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './services/roles/roles.service';
import { Role } from 'src/database/entities/roles.entity'
import { RolesController } from './controllers/roles/roles.controller';
import { StaffRole } from 'src/database/entities';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, StaffRole])],
  controllers: [RolesController],
  providers: [RolesResolver, RolesService, ProductService],
  exports: [RolesService]
})
export class RolesModule {}
