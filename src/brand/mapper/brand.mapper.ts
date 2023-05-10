import { BrandPostMapper } from '../../brandpost/mapper/brandpost.mapper';
import { ItemMapper } from '../../item/mapper/item.mapper';
import { TopicMapper } from '../../topic/mapper/topic.mapper';
import { CreateBrandDto } from '../dto/request/create-brand.dto';
import { UpdateBrandDto } from '../dto/request/update-brand.dto';
import { BrandResponse } from '../dto/response/response-brand.dto';
import { BrandEntity } from '../entities/brand.entity';

export class BrandMapper {
  public static toEntity(
    request: CreateBrandDto | UpdateBrandDto,
    userId: number,
  ) {
    const entity = new BrandEntity();

    if (request instanceof UpdateBrandDto) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
    }
    entity.name = request.name;
    entity.imageUrl = request.imageUrl;
    entity.userId = userId;
    if (request instanceof CreateBrandDto) {
      entity.createdAt = request.createdAt;
    }

    return entity;
  }

  public static toResponse(entity: BrandEntity) {
    const response = new BrandResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.imageUrl = entity.imageUrl;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    response.items = ItemMapper.toResponseList(entity.items);
    response.posts = BrandPostMapper.toResponseList(entity.posts);
    response.topics = TopicMapper.toResponseList(entity.topics);

    return response;
  }

  public static toResponseList(entities: BrandEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
