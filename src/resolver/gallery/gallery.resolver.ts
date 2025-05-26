import { Query, Resolver } from '@nestjs/graphql';
import { Gallery } from 'src/database/entities/galleries.entity';
import { GalleryService } from 'src/Services/gallery/gallery.service';

@Resolver(() => Gallery)
export class galleryResolver {
    constructor(private galleryService: GalleryService) {}

    @Query(() => [Gallery], {name: 'tag'})
    async findTag(): Promise<Gallery[]> {
        return this.galleryService.findGallery();
    }
}