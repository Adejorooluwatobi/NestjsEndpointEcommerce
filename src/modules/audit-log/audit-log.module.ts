import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';import { AuditLog } from 'src/database/entities/auditLog.entity';
import { AuditLogController } from '../../controllers/audit-log/audit-log.controller';
import { AuditLogService } from '../../Services/audit-log/audit-log.service';
;

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_categoryion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[AuditLogController],
  providers: [AuditLogService],
  exports: [AuditLogService]
})
export class AuditLogModule {}
