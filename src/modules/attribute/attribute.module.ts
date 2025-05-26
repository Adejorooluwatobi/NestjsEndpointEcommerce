import { Module } from '@nestjs/common';
import { AttributeService } from '../../Services/attribute/attribute.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute, ProductAttribute } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AttributeController } from '../../controllers/attribute/attribute.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, ProductAttribute]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_attributeion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule {}
