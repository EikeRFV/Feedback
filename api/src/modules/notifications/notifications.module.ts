import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsService } from './notifications.service';
import { UsersModule } from '../users/users.module';
import { NotificationsController } from './notifications.controller';
import { Notification } from '../../common/entities/notification.entity';

@Module({
	imports: [SequelizeModule.forFeature([Notification]), UsersModule],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService]
})
export class NotificationsModule { }