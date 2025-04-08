import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/Post.entity';
import { User } from 'src/database/entities/User.entity';
import { UserPostController } from './controllers/user-post/user-post.controller';
import { UserPostService } from './services/user-post/user-post.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [UserPostController],
  providers: [UserPostService]
})
export class UserPostModule {}