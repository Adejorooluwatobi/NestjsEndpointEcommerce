import { Controller, Patch, Body, Param, Get } from '@nestjs/common';
import { UpdateInventoryDto } from '../../dtos/UpdateInventory.dto';
import { InventoryService } from '../../services/inventory/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Patch(':productId')
  async updateInventory(
    @Param('productId') productId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.updateInventory(productId, updateInventoryDto);
  }

  @Get(':productId')
  async checkStock(@Param('productId') productId: string) {
    return this.inventoryService.checkInventory(productId);
  }
}