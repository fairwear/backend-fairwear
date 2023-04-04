import { CreateBrandDto } from '../dto/request/create-brand.dto';
import { UpdateBrandDto } from '../dto/request/update-brand.dto';
import { BrandResponse } from '../dto/response/response-brand.dto';
import { BrandEntity } from '../entities/brand.entity';

export class BrandMapper {
  public static toEntity(request: CreateBrandDto | UpdateBrandDto) {
    const entity = new BrandEntity();

    if (request instanceof UpdateBrandDto) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt || new Date();
    }
    entity.name = request.name;
    entity.createdAt = request.createdAt || new Date();

    return entity;
  }

  public static toResponse(entity: BrandEntity) {
    const response = new BrandResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    return response;
  }

  public static toResponseList(entities: BrandEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
