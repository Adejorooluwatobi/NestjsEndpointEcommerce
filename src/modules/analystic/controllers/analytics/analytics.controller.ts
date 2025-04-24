import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { CreateAnalyticDto } from '../../dtos/CreateAnalyticsDto';
import { UpdateAnalyticDto } from '../../dtos/UpdateAnalyticsDto';
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

  @Patch(':id')
  async updateAnalytics(
    @Param('id') id: string,
    @Body() updateAnalyticsDto: UpdateAnalyticDto,
  ): Promise<Analytics> {
    return this.analyticsService.updateAnalytics(id, updateAnalyticsDto);
  }

  @Delete(':id')
  async deleteAnalytics(@Param('id') id: string): Promise<void> {
    return this.analyticsService.deleteAnalytics(id);
  }
}