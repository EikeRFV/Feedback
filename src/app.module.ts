import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewRequestModule } from './modules/review-request/review-request.module';
import { AcceptReviewModule } from './modules/accept-review/accept-review.module';
import { SolutionModule } from './modules/solution/solution.module';
import { StatementsModule } from './modules/statements/statements.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditModule } from './modules/audit/audit.module';
import { ChatModule } from './modules/chat/chat.module';
import { UserCommentsModule } from './modules/user-comments/user-comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      autoLoadModels: true,
      define: {
        underscored: true,
      },
    }),
    UsersModule,
    AuthModule,
    ReviewRequestModule,
    AcceptReviewModule,
    SolutionModule,
    UserCommentsModule,
    StatementsModule,
    WebhooksModule,
    NotificationsModule,
    AuditModule,
    ChatModule,
  ],
})
export class AppModule { }
