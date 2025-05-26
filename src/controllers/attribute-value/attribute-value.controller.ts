import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { AttributeValueService } from '../../Services/attribute-value/attribute-value.service';
import { CreateAttributeValueDto } from '../../DTOs/AttributeValueDTO/CreateAttribute.dto';
import { UpdateAttributeValueDto } from '../../DTOs/AttributeValueDTO/UpdateAttribute.dto';

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
            await this.attributeValueService.updateAttributeValue(id, updateAttributeValueDto);
            return this.attributeValueService.findAttributeValueById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteAttributeValueById(
        @Param('id') id: string) {
            const result = await this.attributeValueService.deleteAttributeValue(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Attribute Value deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
