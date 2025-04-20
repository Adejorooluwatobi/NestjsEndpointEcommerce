import { Query, Resolver } from '@nestjs/graphql';
import { Notification } from 'src/database/entities';
import { NotificationService } from './services/notification/notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
    constructor(private roleService: NotificationService) {}

    @Query(() => [Notification], {name: 'notification'})
    async findNotification(): Promise<Notification[]> {
        return this.roleService.findNotification();
    }
}
