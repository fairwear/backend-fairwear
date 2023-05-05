import { CreateItemDto } from '../dto/request/create-item.dto';
import { UpdateItemDto } from '../dto/request/update-item.dto';
import { ItemResponse } from '../dto/response/response-item.dto';
import { ItemEntity } from '../entity/item-entity';

export class ItemMapper {
  public static toEntity(
    request: CreateItemDto | UpdateItemDto,
    userId: number,
  ) {
    const entity = new ItemEntity();

    if (request instanceof UpdateItemDto) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
    }
    entity.name = request.name;
    entity.imageUrl = request.imageUrl;
    entity.barcode = request.barcode;
    entity.brandId = request.brandId;
    entity.userId = userId;
    if (request instanceof CreateItemDto) {
      entity.createdAt = request.createdAt;
    }

    return entity;
  }

  public static toResponse(entity: ItemEntity) {
    const response = new ItemResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.imageUrl = entity.imageUrl;
    response.barcode = entity.barcode;
    response.brandId = entity.brandId;
    response.userId = entity.userId;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    return response;
  }

  public static toResponseList(entities: ItemEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
