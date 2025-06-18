import { Query, Resolver } from '@nestjs/graphql';
import { Sell } from 'src/database/entities';
import { SellService } from '../../Services/sell/sell.service';

@Resolver(() => Sell)
export class SellResolver {
    constructor(private SellService: SellService) {}

    @Query(() => [Sell], {name: 'Sell'})
    async findSell(): Promise<Sell[]> {
        return this.SellService.findSell();
    }
}
