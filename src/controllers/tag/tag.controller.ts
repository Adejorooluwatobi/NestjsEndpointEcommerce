import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateTagDto } from '../../DTOs/TagDTO/CreateTag.dto';
import { UpdateTagDto } from '../../DTOs/TagDTO/UpdateTag.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { TagService } from '../../Services/tag/tag.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, TagResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(TagResponseDto)
@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new tag' })
        @ApiCreatedResponse({
            description: 'Tag created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(TagResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createTag(@Body() createTagDto: CreateTagDto) {
        const tag = await this.tagService.createTag(createTagDto);
        return {
            succeeded: true,
            message: 'Tag created successfully',
            statusCode: 201,
            resultData: tag,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all tag' })
        @ApiOkResponse({
            description: 'Tag retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(TagResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getTag() {
        const tag = await this.tagService.findTag();
        return {
            succeeded: true,
            message: 'Tags retrieved successfully',
            statusCode: 200,
            resultData: tag,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get tag by ID' })
        @ApiOkResponse({
            description: 'Tag retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(TagResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Tag not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getTagById(@Param('id') id: string) {
        const tag = await this.tagService.findTagById(id);
        if (!tag) {
            throw new Error(`Tag with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Tag retrieved successfully',
            statusCode: 200,
            resultData: tag,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @ApiOperation({ summary: 'Update tag by ID' })
        @ApiOkResponse({
            description: 'Tag updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(TagResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Tag not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateTagById(
        @Param('id') id: string,
        @Body() updateTagDto: UpdateTagDto,) {
            const tag = await this.tagService.updateTag(id, updateTagDto)
        if (!tag) {
            throw new Error(`Tag with ID ${id} not found`);
        }
            return {
                succeeded: true,
                message: 'Tag updated successfully',
                statusCode: 200,
                resultData: tag,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteTagById(
        @Param('id') id: string) {
            await this.tagService.deleteTag(id);
        }

}
