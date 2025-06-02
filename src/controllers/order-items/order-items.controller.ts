import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderItemsService } from '../../Services/order-items/order-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderItemDto } from '../../DTOs/OrderItemDTO/CreateOrderItems.dto';
import { UpdateOrderItemDto } from '../../DTOs/OrderItemDTO/UpdateOrderItems.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, OrderItemsResponseDto, OrderStatusResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';


@ApiExtraModels(OrderItemsResponseDto)
@Controller('order-items')
export class OrderItemsController {
    constructor(private orderItemsService: OrderItemsService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @Get()
        @ApiOperation({ summary: 'Get all order items' })
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
    async getOrderItems() {
        const orderItem = await this.orderItemsService.findOrderItems();
        return {
            succeeded: true,
            message: 'Order Items retrieved successfully',
            statusCode: 200,
            resultData: orderItem,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
     @ApiBearerAuth()
        @Get(':id')
        @ApiOperation({ summary: 'Get order item by customer ID' })
        @ApiOkResponse({
            description: 'order Item retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Order Items not found',
            type: ErrorResponseDto
        })
    async getOrderItemById(@Param('id', ParseUUIDPipe) id: string) {
        const orderItem = await this.orderItemsService.findOrderItemById(id);
        if (!orderItem) {
            throw new Error(`Order Item with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Order Item retrieved successfully',
            statusCode: 200,
            resultData: orderItem,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get('order/:orderId')
    @ApiOperation({ summary: 'Get order item by order ID' })
        @ApiOkResponse({
            description: 'order Item retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Order Items not found',
            type: ErrorResponseDto
        })
    async getOrderItemsByOrderId(@Param('orderId', ParseUUIDPipe) orderId: string) {
        const orderItem = await this.orderItemsService.findOrderItemsByOrderId(orderId);
        if (!orderItem || orderItem.length === 0) {
            throw new Error(`Order Items with Order ID ${orderId} not found`);
        }
        return {
            succeeded: true,
            message: 'Order Items retrieved successfully',
            statusCode: 200,
            resultData: orderItem,
        };
    }

    @UseGuards(CustomerGuard)
    @Post()
        @ApiOperation({ summary: 'Create a order items Record' })
        @ApiCreatedResponse({
            description: 'order Items created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderItemsResponseDto) }
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
            description: 'order items with this email already exists'
        })
    async createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
        const orderItem = await this.orderItemsService.createOrderItem(createOrderItemDto);
        return {
            succeeded: true,
            message: 'Order Item created successfully',
            statusCode: 201,
            resultData: orderItem,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
        @Put(':id')
        @ApiOperation({ summary: 'Update order item by ID' })
        @ApiOkResponse({
            description: 'order item updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrderItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({ description: 'order items not found', type: ErrorResponseDto })
        @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    async updateOrderItemById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateOrderItemDto: UpdateOrderItemDto) {
            const OrderItem = await this.orderItemsService.updateOrderItem(id, updateOrderItemDto);
            return {
            succeeded: true,
            message: 'Order Items created successfully',
            statusCode: 201,
            resultData: OrderItem,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteOrderItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.orderItemsService.deleteOrderItem(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'OrderItems deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}