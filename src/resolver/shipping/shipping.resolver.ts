import { Query, Resolver } from '@nestjs/graphql';
import { ShippingService } from '../../Services/shipping/shipping.service';
import { Shipping } from 'src/database/entities/shippings.entity';

@Resolver(() => Shipping)
export class ShippingResolver {
    constructor(private shippingService: ShippingService) {}

    @Query(() => [Shipping], {name: 'shipping'})
    async findShipping(): Promise<Shipping[]> {
        return this.shippingService.findShipping();
    }
}
