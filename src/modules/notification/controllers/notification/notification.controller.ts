import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { NotificationService } from '../../services/notification/notification.service';
import { CreateNotificationDto } from '../../dtos/CreateNotification.dto';
import { UpdateNotificationDto } from '../../dtos/UpdateNotification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly roleService: NotificationService) {}

    @Post()
    createNotification(@Body() createNotificationDto: CreateNotificationDto) {
        return this.roleService.createNotification(createNotificationDto)
    }

    @Get()
    async getNotification() {
        return this.roleService.findNotification();
    }

    @Get(':id')
    async getNotificationById(@Param('id', ParseUUIDPipe) id: string) {
        return this.roleService.findNotificationById(id);
    }

    @Put(':id')
    async updateNotificationById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateNotificationDto: UpdateNotificationDto,) {
            await this.roleService.updateNotification(id, UpdateNotificationDto);
        }
    
    @Delete(':id')
    async deleteNotificationById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        await this.roleService.deleteNotification(id);
    }
}
