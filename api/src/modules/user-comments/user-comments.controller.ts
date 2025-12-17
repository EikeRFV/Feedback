import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserCommentsService } from './user-comments.service';
import { CreateUserCommentDto } from './dto/create-user-comment.dto';
import { UpdateUserCommentDto } from './dto/update-user-comment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserComment } from './entities/user-comment.entity';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('user-comments')
@ApiTags('User Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserCommentsController {
  constructor(private readonly userCommentsService: UserCommentsService) { }

  @Post()
  @ApiCreatedResponse({
    type: UserComment,
    description: 'Comment created successfully'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createUserCommentDto: CreateUserCommentDto) {
    return this.userCommentsService.create(createUserCommentDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: [UserComment],
    description: 'List all comments'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAllByUser(
    @GetUser() user: User,
  ) {
    return this.userCommentsService.findAllByUser(user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserComment,
    description: 'Get comment by id'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.userCommentsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserComment,
    description: 'Update comment'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateUserCommentDto: UpdateUserCommentDto) {
    return this.userCommentsService.update(id, updateUserCommentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete comment'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.userCommentsService.remove(id);
  }
}
