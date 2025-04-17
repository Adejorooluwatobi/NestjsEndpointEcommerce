import { Module } from '@nestjs/common';
import { StaffRolesResolver } from './staff-roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRole } from 'src/database/entities/staffRoles.entity';
import { StaffRolesController } from './controllers/staff-roles/staff-roles.controller';
import { StaffRolesService } from './services/staff-roles/staff-roles.service';
import { Role, StaffAccount } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([StaffRole, Role, StaffAccount]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [StaffRolesController],
  providers: [StaffRolesResolver, StaffRolesService],
  exports: [StaffRolesService]
})
export class StaffRolesModule {}
