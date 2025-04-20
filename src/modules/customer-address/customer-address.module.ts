import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, CustomerAddress } from 'src/database/entities';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerAddressController } from './controllers/customer-address/customer-address.controller';
import { CustomerAddressService } from './services/customer-address/customer-address.service';


@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress, Customer]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: [CustomerAddressService], // Export the service if needed in other modules
})
export class CustomerAddressModule {}