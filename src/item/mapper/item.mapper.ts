import { CreateItemDto } from '../dto/request/create-item.dto';
import { UpdateItemDto } from '../dto/request/update-item.dto';
import { ItemResponse } from '../dto/response/response-item.dto';
import { ItemEntity } from '../entities/item-entity';

export class ItemMapper {
  public static toEntity(request: CreateItemDto | UpdateItemDto) {
    const entity = new ItemEntity();

    if (request instanceof UpdateItemDto) {
      entity.id = request.id;
    }
    entity.name = request.name;
    entity.brandId = request.brandId;

    return entity;
  }

  public static toResponse(entity: ItemEntity) {
    const response = new ItemResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.brandId = entity.brandId;

    return response;
  }

  public static toResponseList(entities: ItemEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
