import { Controller, Put, Body, Param, Get, Post } from '@nestjs/common';
import { UpdateInventoryDto } from '../../dtos/UpdateInventory.dto';
import { InventoryService } from '../../services/inventory/inventory.service';
import { CreateInventoryDto } from '../../dtos/CreateInventoryDto';

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
    return this.inventoryService.updateInventory(productId, updateInventoryDto);
  }

  @Get(':productId')
  async checkStock(@Param('productId') productId: string) {
    return this.inventoryService.checkInventory(productId);
  }
}