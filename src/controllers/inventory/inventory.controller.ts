import { Controller, Put, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { UpdateInventoryDto } from '../../DTOs/InventoryDTO/UpdateInventory.dto';
import { InventoryService } from '../../Services/inventory/inventory.service';
import { CreateInventoryDto } from '../../DTOs/InventoryDTO/CreateInventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async createInventory(
    @Param()
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Get()
  async getInventory() {
    return this.inventoryService.getInventory();
  }

  @Put(':productId')
  async updateInventory(
    @Param('productId') productId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    await this.inventoryService.updateInventory(productId, updateInventoryDto);
    return this.inventoryService.checkInventory(productId);
  }

  @Get(':productId')
  async checkStock(@Param('productId') productId: string) {
    return this.inventoryService.checkInventory(productId);
  }

  @Delete(':productId')
  async deleteInventory(@Param('productId') productId: string) {
    const result = await this.inventoryService.deleteInventory(productId);
    if (result.affected && result.affected > 0) {
                return {success: true, message: 'Service deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
  }
}