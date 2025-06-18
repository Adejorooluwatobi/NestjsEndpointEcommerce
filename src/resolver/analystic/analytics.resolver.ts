import { Query, Resolver } from '@nestjs/graphql';
import { AnalyticsService } from '../../Services/analytics/analytics.service';
import { Analytics } from 'src/database/entities/analytics.entity';

@Resolver(() => Analytics)
export class AnalyticsResolver {
    constructor(private productService: AnalyticsService) {}

    @Query(() => [Analytics], {name: 'product'})
    async findAnalytics(): Promise<Analytics[]> {
        return this.productService.findAnalytics();
    }
}
