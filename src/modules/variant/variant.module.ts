import { Module } from '@nestjs/common';
import { VariantResolver } from './variant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantService } from './services/variant/variant.service';
import { Variant } from 'src/database/entities/variants.entity'
import { VariantController } from './controllers/variant/variant.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Variant]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [VariantController],
  providers: [VariantResolver, VariantService],
  exports: [VariantService]
})
export class VariantModule {}
