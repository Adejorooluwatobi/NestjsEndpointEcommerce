import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateSellDto } from 'src/DTOs/SellDTO/CreateSell.dto';
import { UpdateSellDto } from 'src/DTOs/SellDTO/UpdateSell.dto';
import { SellService } from 'src/Services/sell/sell.service';


@Controller('sell')
export class SellController {
    constructor(private readonly sellService: SellService) {}

    @Post()
    createSell(@Body() createSellDto: CreateSellDto) {
        return this.sellService.createSell(createSellDto)
    }

    @Get()
    async getSell() {
        return this.sellService.findSell();
    }

    @Get(':id')
    async getSellById(@Param('id', ParseUUIDPipe) id: string) {
        return this.sellService.findSellById(id);
    }

    @Put(':id')
    async updateSellById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateSellDto: UpdateSellDto,) {
            await this.sellService.updateSell(id, UpdateSellDto);
            return this.sellService.findSellById(id);
        }
    
    @Delete(':id')
    async deleteSellById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.sellService.deleteSell(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Sales deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
