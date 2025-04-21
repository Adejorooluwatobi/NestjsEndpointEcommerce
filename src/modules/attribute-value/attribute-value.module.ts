import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AttributeValueController } from './controllers/attribute-value/attribute-value.controller';
import { AttributeValueService } from './services/attribute-value/attribute-value.service';
;

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValue]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_categoryion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[AttributeValueController],
  providers: [AttributeValueService],
  exports: [AttributeValueService]
})
export class AttributeValueModule {}
