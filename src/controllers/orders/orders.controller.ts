import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from '../../Services/orders/orders.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateOrderDto } from '../../DTOs/OrderDTO/CreateOrder.dto';
import { UpdateOrderDto } from '../../DTOs/OrderDTO/UpdateOrder.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, OrdersResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(OrdersResponseDto)
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    // @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all order' })
        @ApiOkResponse({
            description: 'Orders retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(OrdersResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getOrders() {
        const order = await this.ordersService.findOrders();
        return {
            succeeded: true,
            message: 'Orders retrieved successfully',
            statusCode: 200,
            resultData: order,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get order by ID' })
        @ApiOkResponse({
            description: 'Order retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrdersResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Order not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getOrderById(@Param('id', ParseUUIDPipe) id: string) {
        const order = await this.ordersService.findOrderById(id);
        if (!order) {
            return { error: true, message: 'Order not found', statusCode: 404 };
        }
        return {
            succeeded: true,
            message: 'Order retrieved successfully',
            statusCode: 200,
            resultData: order,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get order by customer ID' })
        @ApiOkResponse({
            description: 'Order retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrdersResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Order not found',
            type: ErrorResponseDto
        })
    @Get('customer/:customerId')
    async getOrdersByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string) {
        const order = await this.ordersService.findOrdersByCustomerId(customerId);
        if (!order) {
            return { error: true, message: 'Order not found', statusCode: 404 };
        }
        return {
            succeeded: true,
            message: 'Order retrieved successfully',
            statusCode: 200,
            resultData: order,
        };
    }

    @UseGuards(CustomerGuard)
    @Post()
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Create a new order' })
        @ApiCreatedResponse({
            description: 'Order created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrdersResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const order = await this.ordersService.createOrder(createOrderDto);
        return {
            succeeded: true,
            message: 'Order created successfully',
            statusCode: 201,
            resultData: order,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update order by ID' })
        @ApiOkResponse({
            description: 'Order updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(OrdersResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Order not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateOrderById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateOrderDto: UpdateOrderDto,) {
            const order = await this.ordersService.updateOrder(id, updateOrderDto);
            if (!order) {
                return { error: true, message: 'Order not found', statusCode: 404 };
            }
            return {
                succeeded: true,
                message: 'Order updated successfully',
                statusCode: 200,
                resultData: order,
            };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteOrderById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.ordersService.deleteOrder(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Order deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}