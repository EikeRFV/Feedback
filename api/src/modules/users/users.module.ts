import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { ReviewRequestModule } from '../review-request/review-request.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Language } from '@/common/entities/language.entity';
import { UserLanguage } from '@/common/entities/user-language.entity';
import { Role } from '@/common/entities/role.entity';
import { DevStatus } from '@/common/entities/dev-status.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [
    SequelizeModule
      .forFeature([User, Language, UserLanguage, Role, DevStatus]),
    forwardRef(() => ReviewRequestModule)
  ]
})
export class UsersModule { }
