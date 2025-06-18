import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery, Product, ProductAttribute, ProductCategory, ProductCoupon, ProductShipping, ProductTag, Variant } from 'src/database/entities';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
        @InjectRepository(Variant) private variantRepository: Repository<Variant>,
        @InjectRepository(ProductAttribute) private productAttributeRepository: Repository<ProductAttribute>,
        @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
        @InjectRepository(ProductCoupon) private productCouponRepository: Repository<ProductCoupon>,
        @InjectRepository(ProductShipping) private productShippingRepository: Repository<ProductShipping>,
        @InjectRepository(ProductTag) private productTagRepository: Repository<ProductTag>,
    ) {}

    async createProduct(productDetails: CreateProductParams) {
        const newProduct = this.productRepository.create({
            ...productDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedProduct = await this.productRepository.save(newProduct);
        console.log(`Product created successfully with ID: ${savedProduct.id}`);
        return savedProduct;
        
    }

    findProduct() {
        
        return this.productRepository.find({relations: ['productCategory', 'productAttributes', 'galleries', 'variants', 'productTags', 'productCoupons', 'productShippings']}); // Fetch products with their related entities
    }

    findProductByCode(productCode: string) {
        
        return this.productRepository.findOne({ where: { productCode }, relations: ['productCategory', 'productAttributes', 'galleries', 'variants', 'productTags', 'productCoupons', 'productShippings'] }); // Fetch product with its related entities
    }

    async updateProduct(productCode: string, updateProductDetails: UpdateProductParams) {
                await this.productRepository.update({productCode}, { ...updateProductDetails, updatedAt: new Date() });
                return this.productRepository.findOne({ where: {productCode}});
    }

    async deleteProduct(productCode: string) {
        
        return this.productRepository.delete({productCode});
    }

}
