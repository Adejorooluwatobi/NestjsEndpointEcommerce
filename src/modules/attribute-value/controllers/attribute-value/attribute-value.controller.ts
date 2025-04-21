import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { AttributeValueService } from '../../services/attribute-value/attribute-value.service';
import { CreateAttributeValueDto } from '../../dtos/CreateAttributeDto';
import { UpdateAttributeValueDto } from '../../dtos/UpdateAttributeDto';

@Controller('attributeValue')
export class AttributeValueController {
    constructor(private attributeValueService: AttributeValueService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createAttributeValue(@Body() createAttributeValueDto: CreateAttributeValueDto) {
        return this.attributeValueService.createAttributeValue(createAttributeValueDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getAttributeValue() {
        return this.attributeValueService.findAttributeValue();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getAttributeValueById(@Param('id') id: string) {
        return this.attributeValueService.findAttributeValueById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateAttributeValueById(
        @Param('id') id: string,
        @Body() updateAttributeValueDto: UpdateAttributeValueDto,) {
            await this.attributeValueService.updateAttributeValue(id, updateAttributeValueDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteAttributeValueById(
        @Param('id') id: string) {
            await this.attributeValueService.deleteAttributeValue(id);
        }

}
