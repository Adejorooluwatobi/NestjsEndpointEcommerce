import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sell } from 'src/database/entities/sells.entity';
import { CreateSellParams, UpdateSellParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class SellService {
    constructor(
        @InjectRepository(Sell) private SellRepository: Repository<Sell>
    ) {}

    async createSell(SellDetails: CreateSellParams) {
    const newSell = this.SellRepository.create({...SellDetails})
    const savedSell = await this.SellRepository.save(newSell);
    console.log(`Sell created successfully with the ID: ${savedSell.id}`);
    return savedSell;
}

findSell() {
    return this.SellRepository.find();
}

findSellById(id: string) {
    return this.SellRepository.findOne({where: {id}});
}

async updateSell(id: string, updateSellDetails: UpdateSellParams) {
    return this.SellRepository.update(id, {...updateSellDetails,});
}

deleteSell(id: string) {
    return this.SellRepository.delete(id);
}
}
