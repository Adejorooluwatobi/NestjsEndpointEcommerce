import { Module } from '@nestjs/common';
import { NotificationResolver } from './notification.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './services/notification/notification.service';
import { Notification } from 'src/database/entities/notifications.entity'
import { NotificationController } from './controllers/notification/notification.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [NotificationController],
  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
