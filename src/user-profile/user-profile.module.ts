import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/Profile';
import { User } from 'src/database/entities/User';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserProfileController } from './controllers/user-profile/user-profile.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserProfileController],
  providers: [UserProfileService]
})
export class UserProfileModule {}