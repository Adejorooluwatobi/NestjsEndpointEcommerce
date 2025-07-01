import { Module } from '@nestjs/common';
import { CategoryService } from '../../Services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, ProductCategory } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from '../../controllers/category/category.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([Category, ProductCategory]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_categoryion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),
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
  controllers:[CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
