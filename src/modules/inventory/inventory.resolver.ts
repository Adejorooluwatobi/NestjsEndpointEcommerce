import { Args, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './services/inventory/inventory.service';
import { Inventory } from 'src/database/entities/inventory.entity';

@Resolver()
export class InventoryResolver {
    constructor(private inventoryService: InventoryService) {}

    @Query(() => [Inventory], { name: 'inventory' })
    async getInventory(@Args('productId') productId: string) {
        return this.inventoryService.checkInventory(productId); // Pass the required argument
    }
}