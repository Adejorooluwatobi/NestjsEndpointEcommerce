import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderItemsService } from '../../Services/order-items/order-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderItemDto } from '../../DTOs/OrderItemDTO/CreateOrderItems.dto';
import { UpdateOrderItemDto } from '../../DTOs/OrderItemDTO/UpdateOrderItems.dto';
import { UniversalGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, OrderItemsResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';


@ApiExtraModels(OrderItemsResponseDto)
@Controller('order-items')
export class OrderItemsController {
    constructor(private orderItemsService: OrderItemsService) {}

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Get all order items' })
    @ApiOkResponse({
        description: 'Order items retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array',
                            items: { $ref: getSchemaPath(OrderItemsResponseDto) } // Corrected to OrderItemsResponseDto
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

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Get order item by ID' }) // Changed summary to be more accurate
    @ApiOkResponse({
        description: 'Order Item retrieved successfully',
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
        description: 'Order Item not found', // Changed to singular
        type: ErrorResponseDto
    })
    async getOrderItemById(@Param('id', ParseUUIDPipe) id: string) {
        const orderItem = await this.orderItemsService.findOrderItemById(id);
        if (!orderItem) {
            // Using NestJS built-in exceptions is generally better practice
            // throw new NotFoundException(`Order Item with ID ${id} not found`);
            throw new Error(`Order Item with ID ${id} not found`); // Keeping original error style for consistency
        }
        return {
            succeeded: true,
            message: 'Order Item retrieved successfully',
            statusCode: 200,
            resultData: orderItem,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
    @Get('order/:orderId')
    @ApiOperation({ summary: 'Get order items by order ID' }) // Changed summary to plural
    @ApiOkResponse({
        description: 'Order Items retrieved successfully', // Changed to plural
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array', // Expecting an array of order items
                            items: { $ref: getSchemaPath(OrderItemsResponseDto) }
                        }
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
        const orderItems = await this.orderItemsService.findOrderItemsByOrderId(orderId); // Changed variable name to plural
        if (!orderItems || orderItems.length === 0) {
            throw new Error(`Order Items with Order ID ${orderId} not found`);
        }
        return {
            succeeded: true,
            message: 'Order Items retrieved successfully',
            statusCode: 200,
            resultData: orderItems,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
    @Post()
    @ApiOperation({ summary: 'Create one or more order items' }) // Updated summary
    @ApiCreatedResponse({
        description: 'Order Items created successfully', // Changed to plural
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array', // Expecting an array of created order items
                            items: { $ref: getSchemaPath(OrderItemsResponseDto) }
                        }
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
        description: 'Conflict creating order items' // More generic conflict message
    })
async createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
    const createdOrderItems = await this.orderItemsService.createOrderItem(createOrderItemDto);
    return {
        succeeded: true,
        message: 'Order Items created successfully',
        statusCode: 201,
        resultData: createdOrderItems,
    };
}

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update a single order item by ID' }) // Updated summary
    @ApiOkResponse({
        description: 'Order item updated successfully', // Changed to singular
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(OrderItemsResponseDto) } // Expecting a single updated item
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({ description: 'Order item not found', type: ErrorResponseDto }) // Changed to singular
    @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    async updateOrderItemById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateOrderItemDto: UpdateOrderItemDto) {
            const { productId, ...rest } = updateOrderItemDto as any;
            const updatedOrderItem = await this.orderItemsService.updateOrderItem(id, {
                ...rest,
                productId: Array.isArray(productId) ? productId : [productId],
            });
            if (!updatedOrderItem) {
              throw new Error(`Order Item with ID ${id} could not be updated or does not exist`);
            }
            return {
            succeeded: true,
            message: 'Order Item updated successfully', // Changed to singular
            statusCode: 200, // 200 OK for updates, 201 Created for new resources
            resultData: updatedOrderItem,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete order item by ID' }) // Updated summary
    @ApiNoContentResponse({ description: 'Order item deleted successfully' }) // Changed to singular
    @ApiNotFoundResponse({ description: 'Order item not found', type: ErrorResponseDto }) // Changed to singular
    async deleteOrderItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.orderItemsService.deleteOrderItem(id);
        if (result.affected && result.affected > 0) {
            return {succeeded: true, message: 'Order Item deleted successfully', statusCode: 204}; // 204 No Content for successful deletion
        } else {
            // Consider throwing a NotFoundException here if the item wasn't found
            return {succeeded: false, message: 'Order Item not found.', statusCode: 404} // Return appropriate status code
        }
    }
}