import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/User.entity';
import { Post } from 'src/database/entities/Post.entity';
import { CreateUserPostDto } from 'src/user-post/dtos/CreateUserPost.dto';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async createUserPost(id: string, createUserPostDetails: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        'User not found, Cannot create post',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }

  async getUserPosts(id: string) {
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