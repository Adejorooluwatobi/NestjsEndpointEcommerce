import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { GalleryService } from '../../services/gallery/gallery.service';
import { CreateGalleryDto } from '../../dtos/CreateGallery.dto';
import { UpdateGalleryDto } from '../../dtos/UpdateGallery.dto';

@Controller('gallerys')
export class GalleryController {
    constructor(private gallerysService: GalleryService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Get()
    async getGallery() {
        return this.gallerysService.findGallery();
    }

    @UseGuards(CustomerGuard, UserGuard)
    @Get(':id')
    async getGalleryById(@Param('id', ParseUUIDPipe) id: string) {
        return this.gallerysService.findGalleryById(id);
    }

    @UseGuards(CustomerGuard)
    @Post()
    createGallery(@Body() createGalleryDto: CreateGalleryDto) {
        return this.gallerysService.createGallery(createGalleryDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateGalleryById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateGalleryDto: UpdateGalleryDto) {
            return this.gallerysService.updateGallery(id, updateGalleryDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteGalleryById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.gallerysService.deleteGallery(id);
    }
}