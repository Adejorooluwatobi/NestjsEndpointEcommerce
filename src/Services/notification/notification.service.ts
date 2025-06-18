import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from 'src/database/entities/notifications.entity';
import { CreateNotificationParams, UpdateNotificationParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification) private notificationRepository: Repository<Notification>
    ) {}

    async createNotification(notificationDetails: CreateNotificationParams) {
    const newNotification = this.notificationRepository.create({...notificationDetails, createdAt: new Date(), receive_time: new Date()})
    const savedNotification = await this.notificationRepository.save(newNotification);
    console.log(`Notification created successfully with the ID: ${savedNotification.id}`);
    return savedNotification;
}

findNotification() {
    return this.notificationRepository.find();
}

findNotificationById(id: string) {
    return this.notificationRepository.findOne({where: {id}});
}

async updateNotification(id: string, updateNotificationDetails: UpdateNotificationParams) {
    return this.notificationRepository.update(id, {...updateNotificationDetails, createdAt: new Date(), receive_time: new Date()});
}

deleteNotification(id: string) {
    return this.notificationRepository.delete(id);
}
}
