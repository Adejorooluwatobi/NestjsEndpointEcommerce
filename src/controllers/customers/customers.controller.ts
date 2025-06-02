import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards, ValidationPipe, HttpStatus } from '@nestjs/common'; // Added HttpStatus
import { CustomersService } from '../../Services/customers/customers.service';
import { CreateCustomerDto } from 'src/DTOs/CustomerDTO/CreateCustomer.dto';
import { UpdateCustomerDto } from 'src/DTOs/CustomerDTO/UpdateCustomer.dto';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiResponseDto, CustomersResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath, ApiNoContentResponse, ApiExtraModels } from '@nestjs/swagger';
import { Customer } from 'src/database/entities/customers.entity'; // Import Customer entity

@ApiExtraModels(CustomersResponseDto, ApiResponseDto, ErrorResponseDto) // Added ApiExtraModels for Swagger documentation
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
    @Get() // Removed duplicate @Get()
    @ApiOperation({ summary: 'Get all customers' })
    @ApiOkResponse({
        description: 'customers retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: {
                            type: 'array',
                            items: { $ref: getSchemaPath(CustomersResponseDto) }
                        }
                    }
                }
            ]
        }
    })
    async getCustomers() {
        const customers = await this.customersService.findCustomer(); // Changed variable name to 'customers' for clarity
        return {
            succeeded: true,
            message: 'Customers retrieved successfully',
            statusCode: HttpStatus.OK, // Use HttpStatus enum
            resultData: customers,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Get customer by ID' })
    @ApiOkResponse({
        description: 'customer retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(CustomersResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'customer not found',
        type: ErrorResponseDto
    })
    async getCustomerById(@Param('id', ParseUUIDPipe) id: string) {
        // The service method will throw NotFoundException if customer is not found
        const customer = await this.customersService.findCustomerById(id);
        // No need for if (!customer) check here, as service throws NotFoundException
        return {
            succeeded: true,
            message: 'Customer retrieved successfully',
            statusCode: HttpStatus.OK, // Use HttpStatus enum
            resultData: customer,
        };
    }

    @Post()
    @ApiOperation({ summary: 'Create a new Customer Record' })
    @ApiCreatedResponse({
        description: 'Customer created successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(CustomersResponseDto) }
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
        description: 'Customer with this email already exists',
        type: ErrorResponseDto // Added type for consistency
    })
    async createCustomer(@Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto): Promise<Customer> {
        // The service handles the email existence check and throws ConflictException
        const newCustomer = await this.customersService.createCustomer(createCustomerDto);
        return {
            succeeded: true,
            message: 'Customer created successfully',
            statusCode: HttpStatus.CREATED, // Use HttpStatus enum
            resultData: newCustomer,
        } as any; // Cast to any to satisfy Promise<Customer> return type with custom response object
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiOperation({ summary: 'Update customer by ID' })
    @ApiOkResponse({
        description: 'Customer updated successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(CustomersResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({ description: 'Customer not found', type: ErrorResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    @ApiConflictResponse({ description: 'Another customer with this email already exists', type: ErrorResponseDto }) // Added for email conflict
    async updateCustomerById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body(new ValidationPipe()) updateCustomerDto: UpdateCustomerDto, // Added ValidationPipe
    ) {
        // The service method will handle all checks and throw appropriate exceptions
        const updatedCustomer = await this.customersService.updateCustomer(id, updateCustomerDto);
        return {
            succeeded: true,
            message: 'Customer updated successfully',
            statusCode: HttpStatus.OK, // Use HttpStatus enum
            resultData: updatedCustomer,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer by ID' }) // Added ApiOperation
    @ApiNoContentResponse({ description: 'Customer deleted successfully' }) // Use 204 No Content
    @ApiNotFoundResponse({ description: 'Customer not found', type: ErrorResponseDto }) // Added NotFoundResponse
    async deleteCustomerById(
        @Param('id', ParseUUIDPipe) id: string) {
        // The service method will throw NotFoundException if customer is not found
        await this.customersService.deleteCustomer(id);
        return {
            succeeded: true,
            message: 'Customer deleted successfully',
            statusCode: HttpStatus.NO_CONTENT, // 204 No Content
            resultData: null, // No content to return
        };
    }
}
