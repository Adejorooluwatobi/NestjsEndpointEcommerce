import { Query, Resolver } from '@nestjs/graphql';
import { Tag } from 'src/database/entities/tags.entity';
import { TagService } from '../../Services/tag/tag.service';

@Resolver(() => Tag)
export class TagResolver {
    constructor(private tagService: TagService) {}

    @Query(() => [Tag], {name: 'tag'})
    async findTag(): Promise<Tag[]> {
        return this.tagService.findTag();
    }
}
