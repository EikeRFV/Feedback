import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateSolutionCommentDto } from './dto/create-solution-comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution-comment.dto';
import { SolutionCommentsService } from './solution-comments.service';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { SolutionCommentDto } from './dto/solution-comment.dto';
import { DefaultResponse } from '@/common/dto/default-response.dto';

@Controller('solution_comments')
export class SolutionCommentsController {
  constructor(private readonly solutionCommentsService: SolutionCommentsService) { }

  @Post()
  @ApiCreatedResponse({
    type: DefaultResponse
  })
  async create(
    @Body() createCommentDto: CreateSolutionCommentDto,
    @CurrentUser() user: User
  ) {
    const createComment: CreateSolutionCommentDto = {
      ...createCommentDto,
      userId: user.id,
    }

    return await this.solutionCommentsService.create(createComment);
  }

  @Get(':solutionId')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: [SolutionCommentDto]
  })
  async findAllBySolution(
    @Param('solutionId') solutionId: string,
    @CurrentUser() user: User,
  ) {
    return await this.solutionCommentsService.findAllBySolution(solutionId, user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: [SolutionCommentDto]
  })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return await this.solutionCommentsService.findOneById(id, user.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateSolutionCommentDto,
    @CurrentUser() user: User,
  ) {
    const updateComment: UpdateSolutionCommentDto = {
      ...updateCommentDto,
      userId: user.id
    }
    return await this.solutionCommentsService.update(id, updateComment);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return await this.solutionCommentsService.remove(id, user.id);
  }
}
