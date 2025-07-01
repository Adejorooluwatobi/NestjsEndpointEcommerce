import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StaffGuard, UniversalGuard } from 'src/security/auth/guards';
import { GalleryService } from '../../Services/gallery/gallery.service';
import { CreateGalleryDto } from '../../DTOs/GalleryDTO/CreateGallery.dto';
import { UpdateGalleryDto } from '../../DTOs/GalleryDTO/UpdateGallery.dto';
import { ApiResponseDto, ErrorResponseDto, GalleryResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiConsumes, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(GalleryResponseDto)
@Controller('gallerys')
export class GalleryController {
    constructor(private gallerysService: GalleryService) {}

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all Gallery' })
    @ApiOkResponse({
        description: 'Gallery retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array',
                            items: { $ref: getSchemaPath(GalleryResponseDto) }
                        }
                    }
                }
            ]
        }
    })
    @Get()
    async getGallery() {
        const gallery = await this.gallerysService.findGallery();
        return {
            succeeded: true,
            message: 'Gallery retrieved successfully',
            statusCode: 200,
            resultData: gallery,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get gallery by ID' })
    @ApiOkResponse({
        description: 'Gallery retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(GalleryResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'Gallery not found',
        type: ErrorResponseDto
    })
    @Get(':id')
    async getGalleryById(@Param('id', ParseUUIDPipe) id: string) {
        const gallery = await this.gallerysService.findGalleryById(id);
        if (!gallery) {
            throw new Error(`Gallery with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Gallery retrieved successfully',
            statusCode: 200,
            resultData: gallery,
        };
    }

    @UseGuards(UniversalGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a new gallery' })
    @ApiCreatedResponse({
        description: 'Gallery created successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(GalleryResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        type: ErrorResponseDto
    })
    async createGallery(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() image: Express.Multer.File // Required file
) {
    if (!image) {
        throw new BadRequestException('Image file is required');
    }

    const galleryData = {
        ...createGalleryDto,
        image: image.path, // Pass the file path as string
        thumbnail: image.path, // Assuming thumbnail is the same as the image for simplicity
    };
    
    const gallery = await this.gallerysService.createGallery(galleryData);
    return {
        succeeded: true,
        message: 'Gallery created successfully',
        statusCode: 201,
        resultData: gallery,
    };
}

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update gallery by ID' })
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({
        description: 'Gallery updated successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(GalleryResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'Gallery not found',
        type: ErrorResponseDto
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data',
        type: ErrorResponseDto
    })
    @Put(':id')
    async updateGalleryById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateGalleryDto: UpdateGalleryDto,
        @UploadedFile() image?: Express.Multer.File
    ) {
        const updateData = {
            ...updateGalleryDto,
            image: image ? image.path : '', // Pass the file path as string
        };
        const gallery = await this.gallerysService.updateGallery(id, updateData);
        return {
            succeeded: true,
            message: 'Gallery updated successfully',
            statusCode: 200,
            resultData: gallery,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete gallery by ID' })
    @ApiNoContentResponse({ description: 'Gallery deleted successfully' })
    @ApiNotFoundResponse({ description: 'Gallery not found', type: ErrorResponseDto })
    async deleteGalleryById(@Param('id', ParseUUIDPipe) id: string) {
        const result = await this.gallerysService.deleteGallery(id);
        if (result.affected && result.affected > 0) {
            return { success: true, message: 'Gallery deleted successfully' };
        } else {
            return { success: false, message: 'Gallery not found.' };
        }
    }
}