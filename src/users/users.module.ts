import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/User.entity'; // Adjust the import path as necessary
import { Profile } from 'src/database/entities/Profile.entity';
import { Post } from 'src/database/entities/Post.entity';
import { UsersResolver } from './users.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),], // Import TypeOrmModule and register the User entity
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService] // Export UsersService if needed in other modules
})
export class UsersModule {}
