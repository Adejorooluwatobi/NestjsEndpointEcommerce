import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderStatusesService } from '../../Services/order-statuses/order-statuses.service';
import {  } from 'src/security/auth/guards/customer.guard';
import { CreateOrderStatusDto } from '../../DTOs/OrderStatus/CreateOrderStatus.dto';
import { UpdateOrderStatusDto } from '../../DTOs/OrderStatus/UpdateOrderStatus.dto';
import { StaffGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, OrderStatusResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(OrderStatusResponseDto)
@Controller('order-status')
export class OrderStatusesController {
    constructor(private orderStatusesService: OrderStatusesService) {}

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @Get()
        @ApiOperation({ summary: 'Get all order status' })
        @ApiOkResponse({
            description: 'Users retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(OrderStatusResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    async getOrderStatuses() {
        const orderstatus = await this.orderStatusesService.findOrderStatuses();
        return {
             succeeded: true,
            message: 'order status retrieved successfully',
            statusCode: 200,
            resultData: orderstatus,
        }
    }

    @UseGuards(StaffGuard)
    // @ApiBearerAuth()
        @Get(':id')
        @ApiOperation({ summary: 'Get order status by ID' })
        @ApiOkResponse({
            description: 'Order status retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderStatusResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'order status not found',
            type: ErrorResponseDto
        })
    async getOrderStatusById(@Param('id', ParseIntPipe) id: number) {
        const orderstatus = await  this.orderStatusesService.findOrderStatusById(id);
        if (!orderstatus) {
            return { error: true, message: 'Order status not found', statusCode: 404 };
        }
        return {
            succeeded: true,
            message: 'Order status retrieved successfully',
            statusCode: 200,
            resultData: orderstatus,
        };
    }

    @UseGuards(StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new Order status Record' })
        @ApiCreatedResponse({
            description: 'Order status created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderStatusResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
        @ApiConflictResponse({
            description: 'Order Status with this email already exists'
        })
    async createOrderStatus(@Body() createOrderStatusDto: CreateOrderStatusDto) {
        const orderstatus = await this.orderStatusesService.createOrderStatus(createOrderStatusDto);
        return {
            succeeded: true,
            message: 'Order status created successfully',
            statusCode: 201,
            resultData: orderstatus,
        };
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @Put(':id')
        @ApiOperation({ summary: 'Update Order status by ID' })
        @ApiOkResponse({
            description: 'Order Status updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderStatusResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({ description: 'Order Status not found', type: ErrorResponseDto })
        @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    async updateOrderStatusById(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
            const orderstatus = await this.orderStatusesService.updateOrderStatus(id, updateOrderStatusDto);
            if (!orderstatus) {
                return { error: true, message: 'Order status not found', statusCode: 404 };
            }
            return {
                succeeded: true,
                message: 'Order status updated successfully',
                statusCode: 200,
                resultData: orderstatus,
            };
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteOrderStatusById(@Param('id', ParseIntPipe) id: number) {
    try {
        const result = await this.orderStatusesService.deleteOrderStatus(id);
        if (result.affected && result.affected > 0) {
            return { success: true, message: 'Order Status deleted successfully' };
        } else {
            return { error: false, message: 'not found.' };
        }
    } catch (error) {
        console.error(error); // Add this line
        return { error: true, message: error.message || 'Internal server error' };
    }
}
}