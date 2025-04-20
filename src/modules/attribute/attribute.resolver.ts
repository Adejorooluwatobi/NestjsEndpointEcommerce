import { Query, Resolver } from '@nestjs/graphql';
import { Attribute } from 'src/database/entities/attributes.entity';
import { AttributeService } from './services/attribute/attribute.service';

@Resolver(() => Attribute)
export class AttributeResolver {
    constructor(private attributeService: AttributeService) {}

    @Query(() => [Attribute], {name: 'attribute'})
    async findAttribute(): Promise<Attribute[]> {
        return this.attributeService.findAttribute();
    }
}
