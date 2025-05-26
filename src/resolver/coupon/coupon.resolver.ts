import { Query, Resolver } from '@nestjs/graphql';
import { Coupon } from 'src/database/entities/coupons.entity';
import { CouponService } from '../../Services/coupon/coupon.service';

@Resolver(() => Coupon)
export class CouponResolver {
    constructor(private couponService: CouponService) {}

    @Query(() => [Coupon], {name: 'coupon'})
    async findCoupon(): Promise<Coupon[]> {
        return this.couponService.findCoupon();
    }
}
