import { CreateBrandPostDto } from '../dto/request/create-brandpost.dto';
import { ResponseBrandPostDto } from '../dto/response/response-brandpost.dto';
import { BrandPostToItemEntity } from '../entities/brandpost-to-item.entity';
import { BrandPostToTopic } from '../entities/brandpost-to-topic.entity';
import { BrandPostEntity } from '../entities/brandpost.entity';

export class BrandPostMapper {
  public static toEntity(request: CreateBrandPostDto, authorId: number) {
    const entity = new BrandPostEntity();
    entity.body = request.body;
    entity.createdAt = new Date();
    entity.deletedAt = null;
    entity.brandId = request.brandId;
    entity.authorId = authorId;
    entity.votes = [];
    entity.topics = request.topics.map((topic) => {
      const brandPostToTopic = new BrandPostToTopic();
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
    response.body = entity.body;
    response.createdAt = entity.createdAt;
    response.deletedAt = entity.deletedAt;
    response.votes = entity.votes.map((vote) => vote.vote);
    response.topics = entity.topics;
    response.relatedItems = entity.relatedItems;

    return response;
  }

  public static toResponseList(entities: BrandPostEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
