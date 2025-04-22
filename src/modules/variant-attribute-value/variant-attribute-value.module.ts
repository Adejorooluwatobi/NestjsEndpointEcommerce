import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { VariantAttributeValue } from 'src/database/entities/variantAttributeValues.entity';
import { VariantAttributeValueController } from './controllers/variant-attribute-value/variant-attribute-value.controller';
import { VariantAttributeValueService } from './services/variant-attribute-value/variant-attribute-value.service';
import { VariantAttributeValueResolver } from './variant-attribute-value.resolver';
import { AttributeValue, Variant } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([VariantAttributeValue, Variant, AttributeValue]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [VariantAttributeValueController],
  providers: [VariantAttributeValueResolver, VariantAttributeValueService],
  exports: [VariantAttributeValueService]
})
export class VariantAttributeValueModule {}
