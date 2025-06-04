import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from '../../Services/category/category.service';
import { CreateCategoryDto } from '../../DTOs/CategoryDTO/CreateCategory.dto';
import { UpdateCategoryDto } from '../../DTOs/CategoryDTO/UpdateCategory.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, CategoryResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(CategoryResponseDto)
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @ApiOperation({ summary: 'Create a new category' })
        @ApiCreatedResponse({
            description: 'category created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    @UseGuards(UserGuard, StaffGuard)
    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        const category = await this.categoryService.createCategory(createCategoryDto);
        return {
            succeeded: true,
            message: 'Category created successfully',
            statusCode: 201,
            resultData: category,
        }
    }


    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all categories' })
        @ApiOkResponse({
            description: 'Categories retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(CategoryResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getCategory() {
        const category = await this.categoryService.findCategory();
        return {
            succeeded: true,
            message: 'Categories retrieved successfully',
            statusCode: 200,
            resultData: category,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get category by ID' })
        @ApiOkResponse({
            description: 'Category retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'category not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getCategoryById(@Param('id') id: string) {
        const category = await this.categoryService.findCategoryById(id);
        if (!category) {
            throw new Error(`Category with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Category retrieved successfully',
            statusCode: 200,
            resultData: category,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update category by ID' })
        @ApiOkResponse({
            description: 'Category updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Category not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateCategoryById(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,) {
            await this.categoryService.updateCategory(id, updateCategoryDto);
            return this.categoryService.findCategoryById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteCategoryById(
        @Param('id') id: string) {
            const result = await this.categoryService.deleteCategory(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Category deleted successfully'};
            } else {
                return {error: false, message: 'not found.', statusCode: 200, resultData: result};
            }
        }

}
