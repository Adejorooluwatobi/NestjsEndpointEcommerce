import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer, Product } from 'src/database/entities';
import { Review } from 'src/database/entities/customer-engagement_review.entity';
import { Wishlist } from 'src/database/entities/customer-engagement_wishlist.entity';
import { CreateCustomerEngagementReviewParams, CreateCustomerEngagementWishlistParams } from 'src/utils/types';
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
    const product = await this.reviewRepository.create({productId});
      if (!product) {
        throw new HttpException(
          'Product not found, Cannot create a Review',
          HttpStatus.BAD_REQUEST,
          );
      }

      const newReview = this.reviewRepository.create(addReviewDetails);
      return this.reviewRepository.save(newReview);
  }

  async findCustomerEngagementReview(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['reviews'],
    })
    if (!product) {
      throw new HttpException('Product Review not found', HttpStatus.NOT_FOUND)
    }
    return this.reviewRepository.find({ where: { productId } });
  }

  async addToWishlist(customerId: string, addWishlistDetails: CreateCustomerEngagementWishlistParams) {
    const customer = await this.wishlistRepository.create({customerId});
    if (!customer) {
      throw new HttpException(
        'Customer not found, Cannot add wishlist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newWishlist = this.wishlistRepository.create(addWishlistDetails);
    return this.wishlistRepository.save(newWishlist);
  }

  async findCustomerEngagementWishlist(customerId: string){
    const customer =await this.customerRepository.findOne({
      where: {id: customerId},
      relations: ['wishlist'],
    })
    if (!customer) {
      throw new HttpException('Customer wishlist not found', HttpStatus.NOT_FOUND)
    }
    return this.wishlistRepository.find({ where: { customerId } });
  }

}