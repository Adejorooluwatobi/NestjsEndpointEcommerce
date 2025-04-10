import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.entity';
import { Profile } from 'src/database/entities/Profile.entity';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserProfileController } from './controllers/user-profile/user-profile.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
  exports: [UserProfileService], // Export the service if needed in other modules
})
export class UserProfileModule {}