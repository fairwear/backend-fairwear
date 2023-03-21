
import { CreateBrandDto } from '../dto/request/create-brand.dto';
import { UpdateBrandDto } from '../dto/request/update-brand.dto';
import { BrandResponse } from '../dto/response/response-brand.dto';
import { BrandEntity } from '../entities/brand.entity';

export class BrandMapper {
  public static toEntity(request: CreateBrandDto | UpdateBrandDto) {
    const entity = new BrandEntity();

    if (request instanceof UpdateBrandDto) {
      entity.id = request.id;
    }
    entity.name = request.name;
    // entity.topicIds = request.topicIds;
    entity.itemIds = request.itemIds;

    return entity;
  }

  public static toResponse(entity: BrandEntity) {
    const response = new BrandResponse();
    response.id = entity.id;
    response.name = entity.name;
    // entity.topicIds = request.topicIds;
    entity.itemIds = entity.itemIds;

    return response;
  }

  public static toResponseList(entities: BrandEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
