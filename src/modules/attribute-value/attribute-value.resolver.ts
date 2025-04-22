import { Query, Resolver } from '@nestjs/graphql';
import { AttributeValueService } from './services/attribute-value/attribute-value.service';
import { AttributeValue } from 'src/database/entities/attributeValues.entity';


@Resolver(() => AttributeValue)
export class AttributeValueResolver {
    constructor(private attributeValueService: AttributeValueService) {}

    @Query(() => [AttributeValue], {name: 'attributeValue'})
    async findAttributeValue(): Promise<AttributeValue[]> {
        return this.attributeValueService.findAttributeValue();
    }
}
