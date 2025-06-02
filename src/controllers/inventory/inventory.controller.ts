import { Controller, Put, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { UpdateInventoryDto } from '../../DTOs/InventoryDTO/UpdateInventory.dto';
import { InventoryService } from '../../Services/inventory/inventory.service';
import { CreateInventoryDto } from '../../DTOs/InventoryDTO/CreateInventory.dto';
import { ApiResponseDto, ErrorResponseDto, InventoryResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(InventoryResponseDto)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inventory' })
      @ApiCreatedResponse({
          description: 'Inventory created successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(InventoryResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiBadRequestResponse({
              description: 'Invalid input data',
              type: ErrorResponseDto
          })
  async createInventory(
    @Param()
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    const inventory = await this.inventoryService.createInventory(createInventoryDto);
    return {
      succeeded: true,
      message: 'Inventory created successfully',
      statusCode: 201,
      resultData: inventory,
    };
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get all inventory' })
      @ApiOkResponse({
          description: 'Inventory retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: {
                              type: 'array',
                              items: { $ref: getSchemaPath(InventoryResponseDto) }
                          }
                      }
                  }
              ]
          }
      })
  @Get()
  async getInventory() {
    const inventory = await this.inventoryService.getInventory();
    return {
      succeeded: true,
      message: 'Inventory retrieved successfully',
      statusCode: 200,
      resultData: inventory,
    };
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Update inventory by product ID' })
      @ApiOkResponse({
          description: 'Inventory updated successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(InventoryResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Inventory not found',
          type: ErrorResponseDto
      })
      @ApiBadRequestResponse({
          description: 'Invalid input data',
          type: ErrorResponseDto
      })
  @Put(':productId')
  async updateInventory(
    @Param('productId') productId: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const inventory = await this.inventoryService.updateInventory(productId, updateInventoryDto);
    return {
      succeeded: true,
      message: 'Inventory updated successfully',
      statusCode: 200,
      resultData: inventory,
    };
  }

  @ApiBearerAuth()
      @ApiOperation({ summary: 'Get inventory by product ID' })
      @ApiOkResponse({
          description: 'Inventory retrieved successfully',
          schema: {
              allOf: [
                  { $ref: getSchemaPath(ApiResponseDto) },
                  {
                      properties: {
                          resultData: { $ref: getSchemaPath(InventoryResponseDto) }
                      }
                  }
              ]
          }
      })
      @ApiNotFoundResponse({
          description: 'Inventory not found',
          type: ErrorResponseDto
      })
  @Get(':productId')
  async checkStock(@Param('productId') productId: string) {
    const inventory = await this.inventoryService.checkInventory(productId);
    return {
      succeeded: true,
      message: 'Inventory retrieved successfully',
      statusCode: 200,
      resultData: inventory,
    };
  }

  @ApiBearerAuth()
  @Delete(':productId')
  @ApiOperation({ summary: 'Delete by ID' })
          @ApiNoContentResponse({ description: 'deleted successfully' })
          @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
  async deleteInventory(@Param('productId') productId: string) {
    const result = await this.inventoryService.deleteInventory(productId);
    if (result.affected && result.affected > 0) {
                return {success: true, message: 'Service deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
  }
}