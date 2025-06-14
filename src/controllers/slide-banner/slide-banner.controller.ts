import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, SlideBannerResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { CreateSlideBannerDto } from 'src/DTOs/SliderBannerDTO/CreateSlideBanner.dto';
import { StaffGuard, UniversalGuard } from 'src/security/auth/guards';
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createSlideBannerDto: CreateSlideBannerDto,
  ) {
    const slide = await this.postService.createSlideBanner(id, createSlideBannerDto);
    return {
      succeeded: true,
      message: 'Slide banner created successfully',
      statusCode: 201,
      resultData: slide,
    }
  }

    @UseGuards(UniversalGuard)
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
}