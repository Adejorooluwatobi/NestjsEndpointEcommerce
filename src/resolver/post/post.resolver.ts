import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from 'src/database/entities/Post.entity';
import { PostService } from 'src/Services/post/post.service';

@Resolver(() => Post)
export class PostResolver {
    constructor(private postService: PostService) {}

    @Query(() => [Post], {name: 'post'})
    async findTag(
        // Add an argument to accept the user id
        @Args('id', { type: () => String }) id: string
    ): Promise<Post[]> {
        return this.postService.findPosts(id);
    }
}