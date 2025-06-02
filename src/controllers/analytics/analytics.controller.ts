import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AnalyticsService } from '../../Services/analytics/analytics.service';
import { CreateAnalyticDto } from '../../DTOs/analysticDTO/CreateAnalytics.Dto';
import { UpdateAnalyticDto } from '../../DTOs/analysticDTO/UpdateAnalytics.Dto';
import { Analytics } from 'src/database/entities/analytics.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { AnalyticsResponseDto, ApiResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(AnalyticsResponseDto)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all sales analytics' })
  @ApiOkResponse({
    description: 'sales analytics retrieved successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: {
              type: 'array',
              items: { $ref: getSchemaPath(AnalyticsResponseDto) }
            }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ErrorResponseDto
  })
  @Get('sales')
  async getSalesAnalytics(): Promise<Analytics[]> {
    const analytics = await this.analyticsService.getSalesAnalytics();
    if (!analytics || analytics.length === 0) {
      throw new Error('No sales analytics found');
    }
    return analytics;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user behavior analytics' })
  @ApiOkResponse({
    description: 'User behavior analytics retrieved successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: {
              type: 'array',
              items: { $ref: getSchemaPath(AnalyticsResponseDto) }
            }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    type: ErrorResponseDto
  })
  @Get('user-behavior')
  async getUserBehaviorAnalytics(): Promise<Analytics[]> {
    const behavior = await this.analyticsService.getUserBehaviorAnalytics();
    if (!behavior || behavior.length === 0) {
      throw new Error('No user behavior analytics found');
    }
    return behavior;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create all marketing analytics' })
  @ApiCreatedResponse({
    description: 'Marketing analytics created successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(AnalyticsResponseDto) }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
  })
  @Post()
  async createAnalytics(@Body() createAnalyticsDto: CreateAnalyticDto): Promise<Analytics> {
    return this.analyticsService.createAnalytics(createAnalyticsDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update analytics by ID' })
  @ApiOkResponse({
    description: 'Analytics updated successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(AnalyticsResponseDto) }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
  })
  @ApiNotFoundResponse({ description: 'Analytics not found' })
  @Put(':id')
  async updateAnalytics(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticDto,
  ): Promise<Analytics> {
    return this.analyticsService.updateAnalytics(id, updateAnalyticsDto);
  }

  @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
  async deleteAnalytics(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    await this.analyticsService.deleteAnalytics(id);
    return { success: true, message: 'Analyics deleted successfully' };
  }
}