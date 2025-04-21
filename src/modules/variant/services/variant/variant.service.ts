import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Variant } from 'src/database/entities/variants.entity';
import { CreateVariantParams, UpdateVariantParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class VariantService {
    constructor(
        @InjectRepository(Variant) private variantRepository: Repository<Variant>
    ) {}

    async createVariant(variantDetails: CreateVariantParams) {
    const newVariant = this.variantRepository.create({...variantDetails, });
    const savedVariant = await this.variantRepository.save(newVariant);
    console.log(`Variant created successfully with the ID: ${savedVariant}`);
    return savedVariant;
}

findVariant() {
    return this.variantRepository.find();
}

findVariantById(id: string) {
    return this.variantRepository.findOne({where: {id}});
}

async updateVariant(id: string, updateVariantDetails: UpdateVariantParams) {
    return this.variantRepository.update(id, {...updateVariantDetails,  });
}

deleteVariant(id: string) {
    return this.variantRepository.delete(id);
}
}
