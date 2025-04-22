import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { SellService } from '../../services/sell/sell.service';
import { CreateSellDto } from '../../dtos/CreateSell.dto';
import { UpdateSellDto } from '../../dtos/UpdateSell.dto';

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
        }
    
    @Delete(':id')
    async deleteSellById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        await this.sellService.deleteSell(id);
    }
}
