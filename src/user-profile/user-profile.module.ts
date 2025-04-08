import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../database/entities/Profile.entity';
import { User } from '../database/entities/User.entity';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserProfileController } from './controllers/user-profile/user-profile.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService], // Export the service if needed in other modules
})
export class UserProfileModule {}