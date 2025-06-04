import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductCouponService } from '../../Services/product-coupon/product-coupon.service';
import { UpdateProductCouponDto } from '../../DTOs/ProductCouponDTO/UpdateProductCoupon.dto';
import { CreateProductCouponDto } from '../../DTOs/ProductCouponDTO/CreateProductCoupon.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, ProductCouponResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(ProductCouponResponseDto)
@Controller('productCoupon')
export class ProductCouponController {
    constructor(private productService: ProductCouponService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
     @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product coupon by ID' })
        @ApiOkResponse({
            description: 'Product Coupon retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Coupon not found',
            type: ErrorResponseDto
        })
    async createProductCoupon(@Body() createProductCouponDto: CreateProductCouponDto) {
        const prodCoup = await this.productService.createProductCoupon(createProductCouponDto);
        return {
            succeeded: true,
            message: 'Product Coupon created successfully',
            statusCode: 201,
            resultData: prodCoup,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all product coupon' })
        @ApiOkResponse({
            description: 'Product Coupon retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ProductCouponResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getProductCoupon() {
        const prodCoup = await this.productService.findProductCoupon();
        return {
            succeeded: true,
            message: 'Product Coupons retrieved successfully',
            statusCode: 200,
            resultData: prodCoup,
        };
    }


    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product coupon by ID' })
        @ApiOkResponse({
            description: 'Product Coupon retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Coupon not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getProductCouponById(@Param('id') id: string) {
        const prodCoup = await this.productService.findProductCouponById(id);
        if (!prodCoup) {
            throw new Error(`Product Coupon with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Product Coupon retrieved successfully',
            statusCode: 200,
            resultData: prodCoup,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product coupon by ID' })
        @ApiOkResponse({
            description: 'Product Coupon updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCouponResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Coupon not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateProductCouponById(
        @Param('id') id: string,
        @Body() updateProductCouponDto: UpdateProductCouponDto,) {
            const prodCoup = await this.productService.updateProductCoupon(id, updateProductCouponDto);
            if (!prodCoup) {
                throw new Error(`Product Coupon with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Product Coupon updated successfully',
                statusCode: 200,
                resultData: prodCoup,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteProductCouponById(
        @Param('id') id: string) {
            const result = await this.productService.deleteProductCoupon(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Coupon deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
