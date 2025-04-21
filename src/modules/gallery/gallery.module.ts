import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GalleryController } from './controllers/gallery/gallery.controller';
import { GalleryService } from './services/gallery/gallery.service';
import { Gallery, Product } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Gallery]),
    CustomersModule, // Import CustomersModule to use CustomersService
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService]
})
export class GalleryModule {}