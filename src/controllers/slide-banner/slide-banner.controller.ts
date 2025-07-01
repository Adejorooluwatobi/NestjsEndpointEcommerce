import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, SlideBannerResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { CreateSlideBannerDto } from 'src/DTOs/SliderBannerDTO/CreateSlideBanner.dto';
import { UpdateSlideBannerDto } from 'src/DTOs/SliderBannerDTO/UpdateSlideBanner.dto';
import { StaffGuard } from 'src/security/auth/guards';
import { SlideBannerService } from 'src/Services/slide-banner/slide-banner.service';


@ApiExtraModels(SlideBannerResponseDto)
@Controller('users/:id/slide-banners')
export class SlideBannerController {
  constructor(private readonly postService: SlideBannerService) {}

  @UseGuards(StaffGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new slider' })
      @ApiCreatedResponse({
          description: 'Attribute created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(SlideBannerResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
  async createSlideBanner(
    @Body() createSlideBannerDto: CreateSlideBannerDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    if (!image) {
      throw new BadRequestException('Image file is required');
    }
    const slideData = {
      ...createSlideBannerDto,
      image: image.path, // Assuming the image is stored in the path provided by multer
    }
    const slide = await this.postService.createSlideBanner(slideData);
    return {
      succeeded: true,
      message: 'Slide banner created successfully',
      statusCode: 201,
      resultData: slide,
    }
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get all slider' })
      @ApiOkResponse({
          description: 'Attributes retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(SlideBannerResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  @Get()
  async getSlideBanners() {
    const slide = await this.postService.findAllSliders();
    return {
      succeeded: true,
      message: 'Slide banners retrieved successfully',
      statusCode: 200,
      resultData: slide,
    }
  }

  @ApiBearerAuth()
          @ApiOperation({ summary: 'Get slider by ID' })
          @ApiOkResponse({
              description: 'Slider retrieved successfully',
              schema: {
                  allOf: [
                      { $ref: getSchemaPath(ApiResponseDto) },
                      {
                          properties: {
                              resultData: { $ref: getSchemaPath(SlideBannerResponseDto) }
                          }
                      }
                  ]
              }
          })
          @ApiNotFoundResponse({
              description: 'slider not found',
              type: ErrorResponseDto
          })
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    const banner = await this.postService.findSliderById(id);
    if (!banner) throw new BadRequestException(`Slide banner with ID ${id} not found`);
    return {
        succeeded: true,
        message: 'Slide banner retrieved successfully',
        statusCode: 200,
        resultData: banner,
    };
}

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // async create(
  //     @Body() createDto: CreateSlideBannerDto,
  //     @UploadedFile() image: Express.Multer.File
  // ) {
  //     if (!image) throw new BadRequestException('Image file is required');
  //     const bannerData = {
  //         ...createDto,
  //         image: image.path,
  //     };
  //     const banner = await this.postService.createSlideBanner(bannerData);
  //     return {
  //         succeeded: true,
  //         message: 'Slide banner created successfully',
  //         statusCode: 201,
  //         resultData: banner,
  //     };
  // }

  @UseGuards(StaffGuard)
      @ApiBearerAuth()
          @ApiOperation({ summary: 'Update slider by ID' })
          @ApiOkResponse({
              description: 'Slider updated successfully',
              schema: {
                  allOf: [
                      { $ref: getSchemaPath(ApiResponseDto) },
                      {
                          properties: {
                              resultData: { $ref: getSchemaPath(SlideBannerResponseDto) }
                          }
                      }
                  ]
              }
          })
          @ApiNotFoundResponse({
              description: 'Slider not found',
              type: ErrorResponseDto
          })
          @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateDto: UpdateSlideBannerDto,
      @UploadedFile() image?: Express.Multer.File
  ) {
      const updateData = {
          ...updateDto,
          image: image ? image.path : '',
      };
      const banner = await this.postService.updateSlideBanner(id, updateData);
      return {
          succeeded: true,
          message: 'Slide banner updated successfully',
          statusCode: 200,
          resultData: banner,
      };
  }

  @UseGuards(StaffGuard)
      @ApiBearerAuth() // Added ApiBearerAuth for consistency
      @ApiOperation({ summary: 'Delete by ID' })
      @ApiNoContentResponse({ description: 'deleted successfully' })
      @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
      const result = await this.postService.deleteSlideBanner(id);
      if (result.affected && result.affected > 0) {
          return { success: true, message: 'Slide banner deleted successfully' };
      } else {
          return { success: false, message: 'Slide banner not found.' };
      }
  }
}