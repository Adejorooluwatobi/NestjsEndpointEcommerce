import { Controller, Post, Get, Body, Param, ParseUUIDPipe, Put, Delete, UseGuards } from '@nestjs/common'; // Removed NotFoundException
import { CustomerEngagementService } from '../../Services/customer-engagement/customer-engagement.service';
import { CreateCustomerEngagementReviewDto } from '../../DTOs/CustomerEngagementDTO/CreateCustomerEngagementReview.dto';
import { CreateCustomerEngagementWishlistDto } from '../../DTOs/CustomerEngagementDTO/CreateCustomerEngagementWishlist.dto';
import { ApiResponseDto, CustomerEngagementResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { UpdateCustomerEngagementReviewDto } from 'src/DTOs/CustomerEngagementDTO/UpdateCustomerEngagementReview.dto'; // New DTO
import { UpdateCustomerEngagementWishlistDto } from 'src/DTOs/CustomerEngagementDTO/UpdateCustomerEngagementWishlist.dto'; // New DTO
import { UniversalGuard } from 'src/security/auth/guards';


@ApiExtraModels(CustomerEngagementResponseDto)
@Controller('engagement')
export class CustomerEngagementController {
  constructor(private readonly engagementService: CustomerEngagementService) {}

  @Post('reviews/:productId') // Corrected route to include productId
  @ApiOperation({ summary: 'Create a new review for a product' })
  @ApiCreatedResponse({
    description: 'Review created successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or product not found',
    type: ErrorResponseDto
  })
  @UseGuards(UniversalGuard)
  async addReview(
    @Param('productId', ParseUUIDPipe) productId: string, // Changed from 'id' to 'productId'
    @Body() createCustomerEngagementReviewDto: CreateCustomerEngagementReviewDto,
  ) {
    const review = await this.engagementService.addReview(productId, createCustomerEngagementReviewDto);
    return {
      succeeded: true,
      message: 'Review created successfully',
      statusCode: 201,
      resultData: review,
    };
  }

  @Get('reviews/:productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews for a specific product by product ID' })
  @ApiOkResponse({
    description: 'Reviews retrieved successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: {
              type: 'array', // Assuming it returns an array of reviews
              items: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
            }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'Product reviews not found',
    type: ErrorResponseDto
  })
  @UseGuards(UniversalGuard)
  async getReviews(@Param('productId', ParseUUIDPipe) productId: string) {
    if (!productId) {
      throw new Error('Product ID is required');
    }
    const reviews = await this.engagementService.findCustomerEngagementReview(productId);
    return {
      succeeded: true,
      message: 'Reviews retrieved successfully',
      statusCode: 200,
      resultData: reviews,
    };
  }

  @Put('reviews/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing review by its ID' })
  @ApiOkResponse({
    description: 'Review updated successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'Review not found',
    type: ErrorResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
  })
  @UseGuards(UniversalGuard)
  async updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerEngagementReviewDto: UpdateCustomerEngagementReviewDto,
  ) {
    const updatedReview = await this.engagementService.updateReview(id, updateCustomerEngagementReviewDto);
    return {
      succeeded: true,
      message: 'Review updated successfully',
      statusCode: 200,
      resultData: updatedReview,
    };
  }

  @Delete('reviews/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a review by its ID' })
  @ApiNoContentResponse({ description: 'Review deleted successfully' }) // Use 204 No Content for successful deletion
  @ApiNotFoundResponse({
    description: 'Review not found',
    type: ErrorResponseDto
  })
  @UseGuards(UniversalGuard)
  async deleteReview(@Param('id', ParseUUIDPipe) id: string) {
    await this.engagementService.deleteReview(id);
    return {
      succeeded: true,
      message: 'Review deleted successfully',
      statusCode: 204, // No Content
      resultData: null,
    };
  }

  @Post('wishlist/:customerId') // Corrected route to include customerId
  @ApiOperation({ summary: 'Add an item to a customer\'s wishlist' })
  @ApiCreatedResponse({
    description: 'Wishlist item added successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
          }
        }
      ]
    }
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or customer not found',
    type: ErrorResponseDto
  })
  async addToWishlist(
    @Param('customerId', ParseUUIDPipe) customerId: string, // Changed from 'id' to 'customerId'
    @Body() createCustomerEngagementWishlistDto: CreateCustomerEngagementWishlistDto,
  ) {
    const wishlistItem = await this.engagementService.addToWishlist(customerId, createCustomerEngagementWishlistDto);
    return {
      succeeded: true,
      message: 'Wishlist item added successfully',
      statusCode: 201,
      resultData: wishlistItem,
    };
  }

  @Get('wishlist/:customerId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all wishlist items for a specific customer by customer ID' })
  @ApiOkResponse({
    description: 'Wishlist retrieved successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: {
              type: 'array', // Assuming it returns an array of wishlist items
              items: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
            }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'Customer wishlist not found',
    type: ErrorResponseDto
  })
  async getWishlist(@Param('customerId', ParseUUIDPipe) customerId: string) {
    const wishlist = await this.engagementService.findCustomerEngagementWishlist(customerId);
    if (!wishlist) {
      throw new Error(`Wishlist for customer with ID ${customerId} not found`);
    }
    return {
      succeeded: true,
      message: 'Wishlist retrieved successfully',
      statusCode: 200,
      resultData: wishlist,
    };
  }

  @Put('wishlist/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing wishlist item by its ID' })
  @ApiOkResponse({
    description: 'Wishlist item updated successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            resultData: { $ref: getSchemaPath(CustomerEngagementResponseDto) }
          }
        }
      ]
    }
  })
  @ApiNotFoundResponse({
    description: 'Wishlist item not found',
    type: ErrorResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
  })
  async updateWishlistItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCustomerEngagementWishlistDto: UpdateCustomerEngagementWishlistDto,
  ) {
    const updatedWishlistItem = await this.engagementService.updateWishlistItem(id, updateCustomerEngagementWishlistDto);
    return {
      succeeded: true,
      message: 'Wishlist item updated successfully',
      statusCode: 200,
      resultData: updatedWishlistItem,
    };
  }

  @Delete('wishlist/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a wishlist item by its ID' })
  @ApiNoContentResponse({ description: 'Wishlist item deleted successfully' })
  @ApiNotFoundResponse({
    description: 'Wishlist item not found',
    type: ErrorResponseDto
  })
  async deleteWishlistItem(@Param('id', ParseUUIDPipe) id: string) {
    await this.engagementService.deleteWishlistItem(id);
    return {
      succeeded: true,
      message: 'Wishlist item deleted successfully',
      statusCode: 204, // No Content
      resultData: null,
    };
  }
}