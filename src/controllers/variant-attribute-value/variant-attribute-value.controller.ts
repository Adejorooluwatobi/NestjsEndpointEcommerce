import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateVariantAttributeValueDto } from '../../DTOs/VariantAttributeDTO/CreateVariantAttributeValue.dto';
import { UpdateVariantAttributeValueDto } from '../../DTOs/VariantAttributeDTO/UpdateVariantAttributeValue.dto';
import { VariantAttributeValueService } from '../../Services/variant-attribute-value/variant-attribute-value.service';

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
            return this.variantAttributeValueService.findVariantAttributeValueById(id);
        }
    
    @Delete(':id')
    async deleteVariantAttributeValueById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.variantAttributeValueService.deleteVariantAttributeValue(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Variant Attribute Value deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
