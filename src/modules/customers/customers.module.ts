import { Module } from '@nestjs/common';
import { CustomersController } from '../../controllers/customers/customers.controller';
import { CustomersService } from '../../Services/customers/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/Profile.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from 'src/database/entities/customers.entity';
import { CustomersResolver } from 'src/resolver/customers/customers.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Customer, Profile]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),], // Import TypeOrmModule and register the Customer entity
  controllers: [CustomersController],
  providers: [CustomersService, CustomersResolver],
  exports: [CustomersService] // Export CustomersService if needed in other modules
})
export class CustomersModule {}
