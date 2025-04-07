import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserPostService } from 'src/user-post/services/user-post/user-post.service';
import { CreateUserPostDto } from 'src/user-post/dtos/CreateUserPost.dto';

@Controller('users/:id/posts')
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}

  @Post()
  createUserPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userPostService.createUserPost(id.toString(), createUserPostDto);
  }

  @Get()
  getUserPosts(@Param('id', ParseUUIDPipe) id: string) {
    return this.userPostService.getUserPosts(id.toString());
  }
}