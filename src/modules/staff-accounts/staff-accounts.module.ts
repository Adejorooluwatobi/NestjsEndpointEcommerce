import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/Profile.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { StaffAccount } from 'src/database/entities/staffAccounts.entity';
import { StaffsResolver } from './staff-accounts.resolver';
import { StaffAccountsController } from './controllers/staff-accounts/staff-accounts.controller';
import { StaffAccountsService } from './services/staff-accounts/staff-accounts.service';
import { StaffRole } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([StaffAccount, Profile, StaffRole]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),], // Import TypeOrmModule and register the StaffAccount entity
  controllers: [StaffAccountsController],
  providers: [StaffAccountsService, StaffsResolver],
  exports: [StaffAccountsService] // Export StaffAccountsService if needed in other modules
})
export class StaffAccountsModule {}
