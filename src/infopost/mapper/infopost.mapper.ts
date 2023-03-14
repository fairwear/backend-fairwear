import { CreateInfoPostDto } from '../dto/request/create-infopost.dto';
import { UpdateInfoPostDto } from '../dto/request/update-infopost.dto';
import { ResponseInfoPostDto } from '../dto/response/response-infopost.dto';
import { InfoPostEntity } from '../entities/infopost.entity';

export class InfoPostMapper {
  public static toEntity = (request: CreateInfoPostDto | UpdateInfoPostDto) => {
    const entity = new InfoPostEntity();

    if (request instanceof UpdateInfoPostDto) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
      entity.deletedAt = request.deletedAt;
    }

    entity.createdAt = request.createdAt;

    return entity;
  };

  public static toResponse = (entity: InfoPostEntity) => {
    const response = new ResponseInfoPostDto();
    response.id = entity.id;
    response.votes = entity.votes;
    response.topics = entity.topics;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    return response;
  };

  public static toResponseList = (entities: InfoPostEntity[]) => {
    return entities.map((entity) => this.toResponse(entity));
  };
}
