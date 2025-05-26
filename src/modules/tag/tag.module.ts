import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag, Tag } from 'src/database/entities';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TagController } from '../../controllers/tag/tag.controller';
import { TagService } from '../../Services/tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, ProductTag]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {}
