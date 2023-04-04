import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BrandPostService } from './brandpost.service';
import { CreateBrandPostDto } from './dto/request/create-brandpost.dto';
import { BrandPostVoteEntry } from './dto/request/entry/brandpost-vote.dto';
import { BrandPostMapper } from './mapper/brandpost.mapper';

@ApiTags('BrandPost')
@Controller('api/v1/brandpost')
export class BrandPostController {
  constructor(private readonly brandpostService: BrandPostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetCurrentUserId() userId: number,
    @Body() createRequest: CreateBrandPostDto,
  ) {
    const entity = BrandPostMapper.toEntity(createRequest, userId);

    const createdEntity = await this.brandpostService.create(entity);
    return BrandPostMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.brandpostService.findAll();
    return BrandPostMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.brandpostService.findById(+id);
    return BrandPostMapper.toResponse(entity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    const deletedEntity = await this.brandpostService.softDelete(+id, userId);
    return BrandPostMapper.toResponse(deletedEntity);
  }

  @Post(':id/vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() voteEntry: BrandPostVoteEntry,
  ) {
    const entity = await this.brandpostService.vote(+id, userId, voteEntry);
    return BrandPostMapper.toResponse(entity);
  }

  @Get(':id/votes')
  async getVotes(@Param('id') id: string) {
    const votes = await this.brandpostService.getVotes(+id);
    return votes;
  }
}
