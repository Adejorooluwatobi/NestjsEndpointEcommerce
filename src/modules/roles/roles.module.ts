import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from '../../Services/roles/roles.service';
import { Role } from 'src/database/entities/roles.entity'
import { RolesController } from '../../controllers/roles/roles.controller';
import { StaffRole } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RolesResolver } from 'src/resolver/roles/roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Role, StaffRole]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [RolesController],
  providers: [RolesResolver, RolesService],
  exports: [RolesService]
})
export class RolesModule {}
