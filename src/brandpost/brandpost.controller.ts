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
import Public from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BrandPostService } from './brandpost.service';
import { CreateBrandPostDto } from './dto/request/create-brandpost.dto';
import { BrandPostVoteEntry } from './dto/request/entry/brandpost-vote.dto';
import { BrandPostVoteResponseDto } from './dto/response/brandpost-vote-response.dto';
import { ResponseBrandPostDto } from './dto/response/response-brandpost.dto';
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
  ): Promise<ResponseBrandPostDto> {
    const entity = BrandPostMapper.toEntity(createRequest, userId);

    const createdEntity = await this.brandpostService.create(entity);
    return BrandPostMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll(): Promise<ResponseBrandPostDto[]> {
    const entities = await this.brandpostService.findAll();
    return BrandPostMapper.toResponseList(entities);
  }

  @Get('search/:query')
  async search(@Param('query') query: string): Promise<ResponseBrandPostDto[]> {
    const entities = await this.brandpostService.search(query);
    return BrandPostMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ResponseBrandPostDto> {
    const entity = await this.brandpostService.findById(+id);
    return BrandPostMapper.toResponse(entity);
  }

  @Public()
  @Get('brand/:brandId')
  async findAllByBrandId(
    @Param('brandId')
    brandId: number,
  ): Promise<ResponseBrandPostDto[]> {
    const entities = await this.brandpostService.findAllByBrandId(brandId);
    return BrandPostMapper.toResponseList(entities);
  }

  @Get('owner/:postId')
  @UseGuards(JwtAuthGuard)
  async isTheUserPostOwner(
    @Param('postId') postId: string,
    @GetCurrentUserId() userId: number,
  ): Promise<boolean> {
    return this.brandpostService.isTheUserPostOwner(+postId, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
  ): Promise<ResponseBrandPostDto> {
    const deletedEntity = await this.brandpostService.softDelete(+id, userId);
    return BrandPostMapper.toResponse(deletedEntity);
  }

  @Post(':id/vote')
  @UseGuards(JwtAuthGuard)
  async vote(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() voteEntry: BrandPostVoteEntry,
  ): Promise<ResponseBrandPostDto> {
    const entity = await this.brandpostService.vote(+id, userId, voteEntry);
    return BrandPostMapper.toResponse(entity);
  }

  @Get(':id/votes')
  async getVotes(@Param('id') id: string): Promise<BrandPostVoteResponseDto> {
    const votes = await this.brandpostService.getVotes(+id);
    return votes;
  }

  @Get(':id/is-voted')
  @UseGuards(JwtAuthGuard)
  async getIsVoted(
    @GetCurrentUserId() userId: number,
    @Param('id') id: string,
  ) {
    try {
      const isVoted = await this.brandpostService.getIsVoted(+id, userId);
      return isVoted;
    } catch (e) {
      console.log(e);
    }
  }
}

// : Promise<{
//   isVoted: boolean;
//   vote: VoteEnum | undefined;
// }>
