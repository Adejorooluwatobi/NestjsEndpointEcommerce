import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AttributeService } from '../../services/attribute/attribute.service';
import { CreateAttributeDto } from '../../dtos/CreateAttributeDto';
import { UpdateAttributeDto } from '../../dtos/UpdateAttributeDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('attribute')
export class AttributeController {
    constructor(private attributeService: AttributeService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createAttribute(@Body() createAttributeDto: CreateAttributeDto) {
        return this.attributeService.createAttribute(createAttributeDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getAttribute() {
        return this.attributeService.findAttribute();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getAttributeById(@Param('id') id: string) {
        return this.attributeService.findAttributeById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateAttributeById(
        @Param('id') id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,) {
            await this.attributeService.updateAttribute(id, updateAttributeDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteAttributeById(
        @Param('id') id: string) {
            await this.attributeService.deleteAttribute(id);
        }

}
