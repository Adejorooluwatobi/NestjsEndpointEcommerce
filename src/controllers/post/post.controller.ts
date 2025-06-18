import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { PostService } from '../../Services/post/post.service';
import { CreatePostDto } from '../../DTOs/PostDTO/CreatePost.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, PostModeResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(PostModeResponseDto,)
@Controller('users/:id/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
      @ApiCreatedResponse({
          description: 'Post created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(PostModeResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
  async createPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    const post = await this.postService.createPost(id.toString(), createPostDto);
    return {
      succeeded: true,
      message: 'Post created successfully',
      statusCode: 201,
      resultData: post,
    };
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get posts' })
      @ApiOkResponse({
          description: 'Posts retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(PostModeResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  @Get()
  async getPosts(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postService.findPosts(id.toString());
    return {
      succeeded: true,
      message: 'Posts retrieved successfully',
      statusCode: 200,
      resultData: post,
    };
  }
}