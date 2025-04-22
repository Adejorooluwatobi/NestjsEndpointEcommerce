import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/Post.entity';
import { User } from 'src/database/entities/User.entity';
import { PostController } from './controllers/post/post.controller';
import { PostService } from './services/post/post.service';


@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}