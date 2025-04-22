import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CouponService } from '../../services/coupon/coupon.service';
import { CreateCouponDto } from '../../dtos/CreateCouponDto';
import { UpdateCouponDto } from '../../dtos/UpdateCouponDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('coupon')
export class CouponController {
    constructor(private couponService: CouponService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createCoupon(@Body() createCouponDto: CreateCouponDto) {
        return this.couponService.createCoupon(createCouponDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getCoupon() {
        return this.couponService.findCoupon();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':couponCode')
    async getCouponByCode(@Param('couponCode') couponCode: string) {
        return this.couponService.findCouponByCode(couponCode);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':couponCode')
    async updateCouponByCode(
        @Param('couponCode') couponCode: string,
        @Body() updateCouponDto: UpdateCouponDto,) {
            await this.couponService.updateCoupon(couponCode, updateCouponDto)
        }

        // @UseGuards(UserGuard)
    @Delete(':couponCode')
    async deleteCouponByCode(
        @Param('couponCode') couponCode: string) {
            await this.couponService.deleteCoupon(couponCode);
        }

}
