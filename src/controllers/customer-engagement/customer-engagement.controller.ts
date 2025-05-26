import { Controller, Post, Get, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CustomerEngagementService } from '../../Services/customer-engagement/customer-engagement.service';
import { CreateCustomerEngagementReviewDto } from '../../DTOs/CustomerEngagementDTO/CreateCustomerEngagementReview.dto';
import { CreateCustomerEngagementWishlistDto } from '../../DTOs/CustomerEngagementDTO/CreateCustomerEngagementWishlist.dto';


@Controller('engagement')
export class CustomerEngagementController {
  constructor(private readonly engagementService: CustomerEngagementService) {}

  @Post('reviews')
  addReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerEngagementReviewDto: CreateCustomerEngagementReviewDto,) {
    return this.engagementService.addReview(id, createCustomerEngagementReviewDto);
  }

  @Get('reviews/:productId')
  getReviews(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.engagementService.findCustomerEngagementReview(productId);
  }

  @Post('wishlist')
  addToWishlist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createCustomerEngagementWishlistDto: CreateCustomerEngagementWishlistDto) {
    return this.engagementService.addToWishlist(id, createCustomerEngagementWishlistDto);
  }

  @Get('wishlist/:customerId')
  async getWishlist(@Param('customerId', ParseUUIDPipe) customerId: string) {
    return this.engagementService.findCustomerEngagementWishlist(customerId);
  }
}