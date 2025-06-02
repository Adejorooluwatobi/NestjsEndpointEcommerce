import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CouponService } from '../../Services/coupon/coupon.service';
import { CreateCouponDto } from '../../DTOs/CouponDTO/CreateCoupon.dto';
import { UpdateCouponDto } from '../../DTOs/CouponDTO/UpdateCoupon.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, CouponResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(CouponResponseDto)
@Controller('coupon')
export class CouponController {
    constructor(private couponService: CouponService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiOperation({ summary: 'Create a new coupon' })
        @ApiCreatedResponse({
            description: 'Coupon created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    @Post()
    async createCoupon(@Body() createCouponDto: CreateCouponDto) {
        const coupon = await this.couponService.createCoupon(createCouponDto);
        return {
            succeeded: true,
            message: 'Coupon created successfully',
            statusCode: 201,
            resultData: coupon,
        };  
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all coupon' })
        @ApiOkResponse({
            description: 'Coupon retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(CouponResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getCoupon() {
        const coupon = await this.couponService.findCoupon();
        return {
            succeeded: true,
            message: 'Coupon retrieved successfully',
            statusCode: 200,
            resultData: coupon,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get coupon by code' })
        @ApiOkResponse({
            description: 'Coupon retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Coupon not found',
            type: ErrorResponseDto
        })
    @Get(':couponCode')
    async getCouponByCode(@Param('couponCode') couponCode: string) {
        const coupon = await this.couponService.findCouponByCode(couponCode);
        if (!coupon) {
            return { error: true, message: 'Coupon not found.' };
        }
        return {
            succeeded: true,
            message: 'Coupon retrieved successfully',
            statusCode: 200,
            resultData: coupon,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiOperation({ summary: 'Update coupon by Code' })
        @ApiOkResponse({
            description: 'Coupon updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Coupon not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':couponCode')
    async updateCouponByCode(
        @Param('couponCode') couponCode: string,
        @Body() updateCouponDto: UpdateCouponDto,) {
            const coupon = await this.couponService.updateCoupon(couponCode, updateCouponDto);
            if (!coupon) {
                return {error: true, message: 'Coupon not found.'};
            }
            return {
                succeeded: true,
                message: 'Coupon updated successfully',
                statusCode: 200,
                resultData: coupon,
            };
        }

        // @UseGuards(UserGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
            @Delete(':couponCode')
            @ApiOperation({ summary: 'Delete by ID' })
            @ApiNoContentResponse({ description: 'deleted successfully' })
            @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteCouponByCode(
        @Param('couponCode') couponCode: string) {
            const result = await this.couponService.deleteCoupon(couponCode);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'coupon deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
