import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { GalleryService } from '../../Services/gallery/gallery.service';
import { CreateGalleryDto } from '../../DTOs/GalleryDTO/CreateGallery.dto';
import { UpdateGalleryDto } from '../../DTOs/GalleryDTO/UpdateGallery.dto';

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
            await this.gallerysService.updateGallery(id, updateGalleryDto);
            return this.gallerysService.findGalleryById(id);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteGalleryById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.gallerysService.deleteGallery(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Gallery deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}