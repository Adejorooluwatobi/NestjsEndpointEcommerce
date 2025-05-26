import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateShippingDto } from '../../DTOs/ShippingDTO/CreateShipping.dto';
import { UpdateShippingDto } from '../../DTOs/ShippingDTO/UpdateShipping.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ShippingService } from '../../Services/shipping/shipping.service';


@Controller('shipping')
export class ShippingController {
    constructor(private shippingService: ShippingService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createShipping(@Body() createShippingDto: CreateShippingDto) {
        return this.shippingService.createShipping(createShippingDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getShipping() {
        return this.shippingService.findShipping();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getShippingById(@Param('id') id: string) {
        return this.shippingService.findShippingById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateShippingById(
        @Param('id') id: string,
        @Body() updateShippingDto: UpdateShippingDto,) {
            await this.shippingService.updateShipping(id, updateShippingDto);
            return this.shippingService.findShippingById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteShippingById(
        @Param('id') id: string) {
            const result = await this.shippingService.deleteShipping(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Shipping deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
