import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Put, Query, UseGuards } from '@nestjs/common'; import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from './entities/user.entity';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { UpdateDevStatusDto, UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated-response.decorator';
import { DefaultResponse } from '@/common/dto/default-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  @ApiOkResponse({
    type: UserResponseDto
  })
  async getUserFromToken(@CurrentUser() user: User) {
    return await this.usersService.findOneById(user.id)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(UserResponseDto)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  async findAllUsers(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return await this.usersService.findAll(limit, offset)
  }


  @Get('developers')
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(UserResponseDto)
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'offset', required: false, type: Number, example: 0 })
  async findAllDevs(
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return await this.usersService.findAllDevs(limit, offset)

  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DefaultResponse
  })
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: User,
  ) {
    updateUserDto = {
      ...updateUserDto,
      userId: user.id
    }
    return await this.usersService.update(updateUserDto)

  }

  @UseGuards(JwtAuthGuard)
  @Put('status/dev')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DefaultResponse
  })
  async updateDevStatus(
    @Body() updateDevStatusDto: UpdateDevStatusDto,
    @CurrentUser() user: User,
  ) {
    return await this.usersService.updateDevStatus(user.id, updateDevStatusDto.status)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: DefaultResponse
  })
  async delete(
    @CurrentUser() user: User,
  ) {
    return await this.usersService.delete(user.id)
  }
}
