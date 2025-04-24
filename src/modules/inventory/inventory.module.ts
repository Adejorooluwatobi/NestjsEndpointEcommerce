import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from 'src/database/entities/inventory.entity';
import { InventoryController } from './controllers/inventory/inventory.controller';
import { InventoryService } from './services/inventory/inventory.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}