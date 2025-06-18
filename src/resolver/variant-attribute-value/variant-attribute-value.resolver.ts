import { Query, Resolver } from '@nestjs/graphql';
import { VariantAttributeValue } from 'src/database/entities';
import { VariantAttributeValueService } from '../../Services/variant-attribute-value/variant-attribute-value.service';

@Resolver(() => VariantAttributeValue)
export class VariantAttributeValueResolver {
    constructor(private roleService: VariantAttributeValueService) {}

    @Query(() => [VariantAttributeValue], {name: 'roles'})
    async findVariantAttributeValue(): Promise<VariantAttributeValue[]> {
        return this.roleService.findVariantAttributeValue();
    }
}
