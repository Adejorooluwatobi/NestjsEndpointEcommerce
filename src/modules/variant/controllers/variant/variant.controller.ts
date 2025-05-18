import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { VariantService } from '../../services/variant/variant.service';
import { CreateVariantDto } from '../../dtos/CreateVariant.dto';
import { UpdateVariantDto } from '../../dtos/UpdateVariant.dto';

@Controller('variant')
export class VariantController {
    constructor(private readonly variantService: VariantService) {}

    @Post()
    createVariant(@Body() createVariantDto: CreateVariantDto) {
        return this.variantService.createVariant(createVariantDto)
    }

    @Get()
    async getVariant() {
        return this.variantService.findVariant();
    }

    @Get(':id')
    async getVariantById(@Param('id', ParseUUIDPipe) id: string) {
        return this.variantService.findVariantById(id);
    }

    @Put(':id')
    async updateVariantById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateVariantDto: UpdateVariantDto,) {
            await this.variantService.updateVariant(id, UpdateVariantDto);
            return this.variantService.findVariantById(id);
        }
    
    @Delete(':id')
    async deleteVariantById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.variantService.deleteVariant(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Variant deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
