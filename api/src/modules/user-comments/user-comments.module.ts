import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCommentsService } from './user-comments.service';
import { UserCommentsController } from './user-comments.controller';
import { UserComment } from './entities/user-comment.entity';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [
		SequelizeModule.forFeature([UserComment]),
		UsersModule,
	],
	controllers: [UserCommentsController],
	providers: [UserCommentsService],
	exports: [UserCommentsService],
})
export class UserCommentsModule { }