import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AnalyticsService } from '../../Services/analytics/analytics.service';
import { CreateAnalyticDto } from '../../DTOs/analysticDTO/CreateAnalytics.Dto';
import { UpdateAnalyticDto } from '../../DTOs/analysticDTO/UpdateAnalytics.Dto';
import { Analytics } from 'src/database/entities/analytics.entity';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales')
  async getSalesAnalytics(): Promise<Analytics[]> {
    return this.analyticsService.getSalesAnalytics();
  }

  @Get('user-behavior')
  async getUserBehaviorAnalytics(): Promise<Analytics[]> {
    return this.analyticsService.getUserBehaviorAnalytics();
  }

  @Post()
  async createAnalytics(@Body() createAnalyticsDto: CreateAnalyticDto): Promise<Analytics> {
    return this.analyticsService.createAnalytics(createAnalyticsDto);
  }

  @Put(':id')
  async updateAnalytics(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticDto,
  ): Promise<Analytics> {
    return this.analyticsService.updateAnalytics(id, updateAnalyticsDto);
  }

  @Delete(':id')
  async deleteAnalytics(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
    await this.analyticsService.deleteAnalytics(id);
    return { success: true, message: 'Analyics deleted successfully' };
  }
}