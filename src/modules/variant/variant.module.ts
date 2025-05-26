import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantService } from '../../Services/variant/variant.service';
import { Variant } from 'src/database/entities/variants.entity'
import { VariantController } from '../../controllers/variant/variant.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Product, VariantAttributeValue } from 'src/database/entities';
import { VariantResolver } from 'src/resolver/variant/variant.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Variant, VariantAttributeValue, Product]),
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
