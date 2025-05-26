import { Query, Resolver } from '@nestjs/graphql';
import { Variant } from 'src/database/entities';
import { VariantService } from '../../Services/variant/variant.service';

@Resolver(() => Variant)
export class VariantResolver {
    constructor(private variantService: VariantService) {}

    @Query(() => [Variant], {name: 'variants'})
    async findVariant(): Promise<Variant[]> {
        return this.variantService.findVariant();
    }
}
