import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GalleryController } from '../../controllers/gallery/gallery.controller';
import { GalleryService } from '../../Services/gallery/gallery.service';
import { Gallery, Product } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery, Product]),
    CustomersModule, // Import CustomersModule to use CustomersService
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
    }),
    // Configure Multer for file uploads
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        storage: diskStorage({
          destination: './uploads', // Make sure this directory exists
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = extname(file.originalname);
            const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB limit
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService]
})
export class GalleryModule {}