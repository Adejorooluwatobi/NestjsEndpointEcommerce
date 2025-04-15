import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/User.entity';
import { Post } from 'src/database/entities/Post.entity';
import { CreatePostDto } from '../../dtos/CreatePost.dto';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createPost(id: string, createPostDetails: CreatePostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found, Cannot create post',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPost = this.postRepository.create({
      ...createPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

  async getPosts(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.posts;
  }
}