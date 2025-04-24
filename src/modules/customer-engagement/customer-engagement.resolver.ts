import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerEngagementService } from './services/customer-engagement/customer-engagement.service';
import { Wishlist } from 'src/database/entities/customer-engagement_wishlist.entity';
import { Review } from 'src/database/entities/customer-engagement_review.entity';

@Resolver()
export class CustomerEngagementResolver {
    constructor(private customerEngagementService: CustomerEngagementService) {}

    @Query(() => [Wishlist], { name: 'wishlist' })
    async findCustomerEngagementWishlist(@Args('customerId') customerId: string): Promise<Wishlist[]> {
        return this.customerEngagementService.findCustomerEngagementWishlist(customerId);
    }

    @Query(() => [Review], { name: 'reviews' })
    async findCustomerEngagementReview(@Args('productId') productId: string): Promise<Review[]> {
        return this.customerEngagementService.findCustomerEngagementReview(productId);
    }
}