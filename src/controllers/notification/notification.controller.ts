import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { NotificationService } from '../../Services/notification/notification.service';
import { CreateNotificationDto } from '../../DTOs/NotificationDTO/CreateNotification.dto';
import { UpdateNotificationDto } from '../../DTOs/NotificationDTO/UpdateNotification.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, NotificationResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(NotificationResponseDto)
@Controller('notification')
export class NotificationController {
    constructor(private readonly roleService: NotificationService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new notification' })
        @ApiCreatedResponse({
            description: 'Notification created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(NotificationResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
        const notification = await this.roleService.createNotification(createNotificationDto);
        return {
            succeeded: true,
            message: 'Notification created successfully',
            statusCode: 201,
            resultData: notification,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all notifications' })
        @ApiOkResponse({
            description: 'Notification retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(NotificationResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getNotification() {
        const notification = await this.roleService.findNotification();
        return {
            succeeded: true,
            message: 'Notification retrieved successfully',
            statusCode: 200,
            resultData: notification,
        };
    }


    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get notification by ID' })
    @ApiOkResponse({
        description: 'Notification retrieved successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(NotificationResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiNotFoundResponse({
        description: 'Notification not found',
        type: ErrorResponseDto
    })
    @Get(':id')
    async getNotificationById(@Param('id', ParseUUIDPipe) id: string) {
        const notification = await this.roleService.findNotificationById(id);
        return {
            succeeded: true,
            message: 'Notification retrieved successfully',
            statusCode: 200,
            resultData: notification,
        }
        }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update notification by ID' })
        @ApiOkResponse({
            description: 'Notification updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(NotificationResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Notification not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateNotificationById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateNotificationDto: UpdateNotificationDto,) {
            const notification = await this.roleService.updateNotification(id, UpdateNotificationDto);
            return {
                succeeded: true,
                message: 'Notification updated successfully',
                statusCode: 200,
                resultData: notification,
            }
        }
    
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteNotificationById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.roleService.deleteNotification(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Notification deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
