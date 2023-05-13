import { UserMapper } from '../../user/mapper/user.mapper';
import { CreateBrandPostDto } from '../dto/request/create-brandpost.dto';
import { ResponseBrandPostDto } from '../dto/response/response-brandpost.dto';
import { UserVoteResponse } from '../dto/response/user-vote.reponse.dto';
import { BrandPostToItemEntity } from '../entities/brandpost-to-item.entity';
import { BrandPostToTopicEntity } from '../entities/brandpost-to-topic.entity';
import { BrandPostVoteEntity } from '../entities/brandpost-vote.entity';
import { BrandPostEntity } from '../entities/brandpost.entity';

export class BrandPostMapper {
  public static toEntity(request: CreateBrandPostDto, authorId: number) {
    const entity = new BrandPostEntity();
    entity.title = request.title;
    entity.body = request.body;
    entity.createdAt = new Date();
    entity.deletedAt = null;
    entity.brandId = request.brandId;
    entity.authorId = authorId;
    entity.references = request.references;
    entity.votes = [];
    entity.topics = request.topics.map((topic) => {
      const brandPostToTopic = new BrandPostToTopicEntity();
      brandPostToTopic.topicId = topic.topicId;
      brandPostToTopic.isBad = topic.isBad;
      return brandPostToTopic;
    });

    entity.relatedItems = request.itemIds.map((itemId) => {
      const brandPostToItem = new BrandPostToItemEntity();
      brandPostToItem.itemId = itemId;
      return brandPostToItem;
    });

    return entity;
  }

  public static toResponse(entity: BrandPostEntity) {
    const response = new ResponseBrandPostDto();

    response.id = entity.id;
    response.title = entity.title;
    response.body = entity.body;
    response.brandId = entity.brandId;
    response.postScore = entity.postScore;
    response.references = entity.references;
    response.votes = this.toUserVoteResponseList(entity.votes);
    response.topics = entity.topics;
    response.relatedItems = entity.relatedItems;
    response.brand = entity.brand;
    response.createdAt = entity.createdAt;
    response.deletedAt = entity.deletedAt;
    response.author = UserMapper.toUserInfoResponse(entity.author);

    return response;
  }

  public static toUserVoteResponse(vote: BrandPostVoteEntity) {
    const response = new UserVoteResponse();

    response.vote = vote.vote;
    response.createdAt = vote.createdAt;
    response.postId = vote.postId;
    response.userId = vote.userId;
    response.user = UserMapper.toUserInfoResponse(vote.user);

    return response;
  }

  public static toUserVoteResponseList(votes: BrandPostVoteEntity[]) {
    return votes.map((vote) => this.toUserVoteResponse(vote));
  }

  public static toResponseList(entities: BrandPostEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
