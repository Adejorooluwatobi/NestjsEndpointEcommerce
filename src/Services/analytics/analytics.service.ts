import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from 'src/database/entities/analytics.entity';
import { CreateAnalyticDto } from '../../DTOs/analysticDTO/CreateAnalytics.Dto';
import { UpdateAnalyticDto } from '../../DTOs/analysticDTO/UpdateAnalytics.Dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private readonly analyticsRepository: Repository<Analytics>,
  ) {}

  async getSalesAnalytics(): Promise<Analytics[]> {
    // Fetch sales analytics from the database
    return this.analyticsRepository.find({ where: { metric: 'sales' } });
  }

  async getUserBehaviorAnalytics(): Promise<Analytics[]> {
    // Fetch user behavior analytics from the database
    return this.analyticsRepository.find({ where: { metric: 'user_behavior' } });
  }

  async createAnalytics(createAnalyticsDto: CreateAnalyticDto): Promise<Analytics> {
    const newAnalytics = this.analyticsRepository.create(createAnalyticsDto);
    return this.analyticsRepository.save(newAnalytics);
  }

  async updateAnalytics(id: string, updateAnalyticsDto: UpdateAnalyticDto): Promise<Analytics> {
    const analytics = await this.analyticsRepository.findOne({ where: { id } });
    if (!analytics) {
      throw new Error('Analytics record not found');
    }

    Object.assign(analytics, updateAnalyticsDto);
    return this.analyticsRepository.save(analytics);
  }

  async deleteAnalytics(id: string): Promise<void> {
    const analytics = await this.analyticsRepository.findOne({ where: { id } });
    if (!analytics) {
      throw new Error('Analytics record not found');
    }

    await this.analyticsRepository.remove(analytics);
  }

  async findAnalytics(): Promise<Analytics[]> {
    // Fetch all analytics records from the database
    return this.analyticsRepository.find();
  }
}