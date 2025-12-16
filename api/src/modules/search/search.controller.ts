import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service.js';
import { SearchDevsDto, SearchReviewsDto, SearchSolutionsDto } from './dto/search.dto';
import { PaginatedDto } from 'src/common/dto/paginated-response.dto';
import { UserResponseDto } from '../users/dto/response-user.dto';
import { ReviewRequestDto } from '../review-request/dto/review-request.dto';
import { SolutionDto } from '../solution/dto/solution.dto';
import { JwtAuthGuard } from '../auth/guard/auth.guard.js';

@Controller('search')
@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @Get('devs')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de desenvolvedores encontrados'
  })
  async searchDevs(
    @Query() query: SearchDevsDto,
  ): Promise<PaginatedDto<UserResponseDto>> {
    return await this.searchService.searchDevs(query);
  }

  @Get('reviews')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de pedidos de review encontrados'
  })
  async searchReviews(
    @Query() query: SearchReviewsDto,
  ): Promise<PaginatedDto<ReviewRequestDto>> {
    return await this.searchService.searchReviews(query);
  }

  @Get('solutions')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: PaginatedDto,
    description: 'Lista de soluções encontradas'
  })
  async searchSolutions(
    @Query() query: SearchSolutionsDto,
  ): Promise<PaginatedDto<SolutionDto>> {
    return await this.searchService.searchSolutions(query);
  }
}
