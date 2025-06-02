import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, Product } from 'src/database/entities';
import { Review } from 'src/database/entities/customer-engagement_review.entity';
import { Wishlist } from 'src/database/entities/customer-engagement_wishlist.entity';
import { CreateCustomerEngagementReviewParams, CreateCustomerEngagementWishlistParams, UpdateCustomerEngagementReviewParams, UpdateCustomerEngagementWishlistParams } from 'src/utils/types'; // New types
import { Repository } from 'typeorm';


@Injectable()
export class CustomerEngagementService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async addReview(productId: string, addReviewDetails: CreateCustomerEngagementReviewParams) {
    // Check if the product exists
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new HttpException(
        'Product not found. Cannot create a Review for a non-existent product.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create a new review and associate it with the product
    const newReview = this.reviewRepository.create({
      ...addReviewDetails,
      productId: productId, // Ensure productId is set
      // Removed 'product: product' as TypeORM handles association via productId
    });
    return this.reviewRepository.save(newReview);
  }

  async findCustomerEngagementReview(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['reviews'], // Ensure reviews are loaded
    });
    if (!product) {
      throw new NotFoundException('Product not found or has no reviews.');
    }
    // Return reviews directly from the product relationship or query them
    return this.reviewRepository.find({ where: { productId } });
  }

  async updateReview(id: string, updateReviewDetails: UpdateCustomerEngagementReviewParams) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }

    // Merge the existing review with the update details
    this.reviewRepository.merge(review, updateReviewDetails);
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: string) {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    // No content to return for a successful deletion (204 No Content)
  }

  async addToWishlist(customerId: string, addWishlistDetails: CreateCustomerEngagementWishlistParams) {
    // Check if the customer exists
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new HttpException(
        'Customer not found. Cannot add to wishlist for a non-existent customer.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create a new wishlist item and associate it with the customer
    const newWishlist = this.wishlistRepository.create({
      ...addWishlistDetails,
      customerId: customerId, // Ensure customerId is set
      // Removed 'customer: customer' as TypeORM handles association via customerId
    });
    return this.wishlistRepository.save(newWishlist);
  }

  async findCustomerEngagementWishlist(customerId: string) {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['wishlist'], // Ensure wishlist items are loaded
    });
    if (!customer) {
      throw new NotFoundException('Customer not found or has no wishlist.');
    }
    // Return wishlist items directly from the customer relationship or query them
    return this.wishlistRepository.find({ where: { customerId } });
  }

  async updateWishlistItem(id: string, updateWishlistDetails: UpdateCustomerEngagementWishlistParams) {
    const wishlistItem = await this.wishlistRepository.findOne({ where: { id } });
    if (!wishlistItem) {
      throw new NotFoundException(`Wishlist item with ID ${id} not found.`);
    }

    // Merge the existing wishlist item with the update details
    this.wishlistRepository.merge(wishlistItem, updateWishlistDetails);
    return this.wishlistRepository.save(wishlistItem);
  }

  async deleteWishlistItem(id: string) {
    const result = await this.wishlistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Wishlist item with ID ${id} not found.`);
    }
    // No content to return for a successful deletion (204 No Content)
  }
}