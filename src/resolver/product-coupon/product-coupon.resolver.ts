import { Query, Resolver } from '@nestjs/graphql';
import { ProductCoupon } from 'src/database/entities/productCoupons.entity';
import { ProductCouponService } from '../../Services/product-coupon/product-coupon.service';


@Resolver(() => ProductCoupon)
export class ProductCouponResolver {
    constructor(private productService: ProductCouponService) {}

    @Query(() => [ProductCoupon], {name: 'product'})
    async findProductCoupon(): Promise<ProductCoupon[]> {
        return this.productService.findProductCoupon();
    }
}
