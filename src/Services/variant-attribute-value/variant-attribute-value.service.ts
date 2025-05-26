import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue, Variant } from 'src/database/entities';
import { VariantAttributeValue } from 'src/database/entities/variantAttributeValues.entity';
import { CreateVariantAttributeValueParams, UpdateVariantAttributeValueParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class VariantAttributeValueService {
    constructor(
        @InjectRepository(VariantAttributeValue) private variantAttributeValueRepository: Repository<VariantAttributeValue>,
        @InjectRepository(Variant) private variantRepository: Repository<Variant>,
        @InjectRepository(AttributeValue) private productRepository: Repository<AttributeValue>,
    ) {}

    async createVariantAttributeValue(variantAttributeValueDetails: CreateVariantAttributeValueParams) {

    const newVariantAttributeValue = this.variantAttributeValueRepository.create({...variantAttributeValueDetails})
    const savedVariantAttributeValue = await this.variantAttributeValueRepository.save(newVariantAttributeValue);
    console.log(`VariantAttributeValue created successfully with the ID: ${savedVariantAttributeValue.id}`);
    return savedVariantAttributeValue;
}

findVariantAttributeValue() {
    return this.variantAttributeValueRepository.find({ relations: ['variant'] });
}

findVariantAttributeValueById(id: string) {
    return this.variantAttributeValueRepository.findOne({where: {id}, relations: ['variant'] });
}

async updateVariantAttributeValue(id: string, updateVariantAttributeValueDetails: UpdateVariantAttributeValueParams) {
    return this.variantAttributeValueRepository.update(id, {...updateVariantAttributeValueDetails });
}

deleteVariantAttributeValue(id: string) {
    return this.variantAttributeValueRepository.delete(id);
}
}
