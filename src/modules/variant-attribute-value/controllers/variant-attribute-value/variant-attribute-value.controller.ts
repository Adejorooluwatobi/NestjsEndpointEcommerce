import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { CreateVariantAttributeValueDto } from '../../dtos/CreateVariantAttributeValue.dto';
import { UpdateVariantAttributeValueDto } from '../../dtos/UpdateVariantAttributeValue.dto';
import { VariantAttributeValueService } from '../../services/variant-attribute-value/variant-attribute-value.service';

@Controller('variantAttributeValues')
export class VariantAttributeValueController {
    constructor(private readonly variantAttributeValueService: VariantAttributeValueService) {}

    @Post()
    createVariantAttributeValue(@Body() createVariantAttributeValueDto: CreateVariantAttributeValueDto) {
        return this.variantAttributeValueService.createVariantAttributeValue(createVariantAttributeValueDto)
    }

    @Get()
    async getVariantAttributeValue() {
        return this.variantAttributeValueService.findVariantAttributeValue();
    }

    @Get(':id')
    async getVariantAttributeValueById(@Param('id', ParseUUIDPipe) id: string) {
        return this.variantAttributeValueService.findVariantAttributeValueById(id);
    }

    @Put(':id')
    async updateVariantAttributeValueById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateVariantAttributeValueDto: UpdateVariantAttributeValueDto,) {
            await this.variantAttributeValueService.updateVariantAttributeValue(id, UpdateVariantAttributeValueDto);
        }
    
    @Delete(':id')
    async deleteVariantAttributeValueById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        await this.variantAttributeValueService.deleteVariantAttributeValue(id);
    }
}
