import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PostService } from '../../Services/post/post.service';
import { CreatePostDto } from '../../DTOs/PostDTO/CreatePost.dto';


@Controller('users/:id/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(id.toString(), createPostDto);
  }

  @Get()
  getPosts(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.findPosts(id.toString());
  }
}