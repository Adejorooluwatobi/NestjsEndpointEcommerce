import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/User.entity';
import { Profile } from 'src/database/entities/Profile.entity';
import { ProfileService } from './services/profile/profile.service';
import { ProfileController } from './controllers/profile/profile.controller';
import { Customer } from 'src/database/entities';


@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Customer])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService], // Export the service if needed in other modules
})
export class ProfileModule {}