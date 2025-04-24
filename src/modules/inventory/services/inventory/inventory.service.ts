import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from 'src/database/entities/inventory.entity';
import { UpdateInventoryParams } from 'src/utils/types';
import { Repository } from 'typeorm';


@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async updateInventory(productId: string, updateInventoryDetails: UpdateInventoryParams) {
    const inventory = await this.inventoryRepository.findOne({ where: { productId } });
    if (!inventory) {
      throw new Error('Inventory not found for product');
    }
    inventory.stockLevel += updateInventoryDetails.stockLevel;
    return this.inventoryRepository.save(inventory);
  }

  async checkInventory(productId: string) {
    const inventory = await this.inventoryRepository.findOne({ where: { productId } });
    return inventory ? inventory.stockLevel : 0;
  }
}