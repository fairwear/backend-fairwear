import { Test, TestingModule } from '@nestjs/testing';
import { BrandPostService as BrandPostService } from './brandpost.service';
import { MockContext, createMockContext } from '../prisma/context';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from '../user-role/user-role.service';
import { DataFactory } from '../../prisma/data/DataFactory';

describe('BrandpostService', () => {
  let service: BrandPostService;
  let mockContext: MockContext;
  let prismaService: DeepMockProxy<PrismaClient>;
  const dataFactory: DataFactory = new DataFactory();

  beforeEach(async () => {
    jest.resetAllMocks();
    mockContext = createMockContext();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        BrandPostService,
        AuthService,
        UserService,
        JwtService,
        UserRoleService,
        PrismaService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockContext.prisma)
      .compile();

    service = module.get<BrandPostService>(BrandPostService);
    prismaService = module.get<DeepMockProxy<PrismaClient>>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return a list of brandposts', async () => {
    const brandposts = dataFactory.getBrandPostList();
    prismaService.brandPost.findMany.mockResolvedValueOnce(brandposts);
    const result = await service.findAll();
    expect(prismaService.brandPost.findMany).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brandposts);
  });

  it('should fail to return a list of brandposts', async () => {
    prismaService.brandPost.findMany.mockRejectedValueOnce(new Error('error'));
    await expect(service.findAll()).rejects.toThrowError('error');
    expect(prismaService.brandPost.findMany).toHaveBeenCalledTimes(1);
  });

  it('should return a brandpost by id', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);
    const result = await service.findById(brandpost.id);
    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it('should fail to return a brandpost by id', async () => {
    prismaService.brandPost.findFirstOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(service.findById(1)).rejects.toThrowError('error');
    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should create a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    prismaService.brandPost.create.mockResolvedValueOnce(brandpost);
    const result = await service.create(brandpost);
    expect(prismaService.brandPost.create).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it('should fail to create a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    prismaService.brandPost.create.mockRejectedValueOnce(new Error('error'));
    await expect(service.create(brandpost)).rejects.toThrowError('error');
    expect(prismaService.brandPost.create).toHaveBeenCalledTimes(1);
  });

  it('should upvote a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    const user = dataFactory.getValidUser();
    const voteEntry = dataFactory.getValidBrandPostVoteEntry();
    const vote = dataFactory.getValidBrandPostUpvote();

    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);
    prismaService.user.findUniqueOrThrow.mockResolvedValueOnce(user);
    prismaService.brandPostVote.update.mockResolvedValueOnce(vote);
    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);

    const result = await service.vote(brandpost.id, user.id, voteEntry);

    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(2);
    expect(prismaService.brandPostVote.update).toHaveBeenCalledTimes(1);

    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it('should downvote a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    const user = dataFactory.getValidUser();
    const voteEntry = dataFactory.getValidBrandPostVoteEntry();
    const vote = dataFactory.getValidBrandPostDownvote();

    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);
    prismaService.user.findUniqueOrThrow.mockResolvedValueOnce(user);
    prismaService.brandPostVote.update.mockResolvedValueOnce(vote);
    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);

    const result = await service.vote(brandpost.id, user.id, voteEntry);

    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(2);
    expect(prismaService.brandPostVote.update).toHaveBeenCalledTimes(1);

    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it("should find a brandpost by it's id", async () => {
    const brandpost = dataFactory.getValidBrandPost();
    prismaService.brandPost.findFirstOrThrow.mockResolvedValueOnce(brandpost);

    const result = await service.findById(brandpost.id);

    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(1);

    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it("should fail to find a brandpost by it's id", async () => {
    prismaService.brandPost.findFirstOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );

    await expect(service.findById(1)).rejects.toThrowError('error');

    expect(prismaService.brandPost.findFirstOrThrow).toHaveBeenCalledTimes(1);
  });

  it('should softDelete a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();
    const user = dataFactory.getValidUser();
    prismaService.brandPost.findUniqueOrThrow.mockResolvedValueOnce(brandpost);
    prismaService.brandPost.update.mockResolvedValueOnce(brandpost);
    prismaService.user.findUniqueOrThrow.mockResolvedValueOnce(user);
    const result = await service.softDelete(brandpost.id, brandpost.authorId);
    expect(prismaService.brandPost.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    expect(prismaService.brandPost.update).toHaveBeenCalledTimes(1);

    expect(result).toBeDefined();
    expect(result).toEqual(brandpost);
  });

  it('should fail to softDelete a brandpost', async () => {
    const brandpost = dataFactory.getValidBrandPost();

    prismaService.brandPost.findUniqueOrThrow.mockRejectedValueOnce(
      new Error('error'),
    );
    await expect(
      service.softDelete(brandpost.id, brandpost.authorId),
    ).rejects.toThrowError('error');
    expect(prismaService.brandPost.findUniqueOrThrow).toHaveBeenCalledTimes(1);
  });
});
