import { CreateInfoPostDto } from '../dto/request/create-infopost.dto';
import { UpdateInfoPostDto } from '../dto/request/update-infopost.dto';
import { ResponseInfoPostDto } from '../dto/response/response-infopost.dto';
import { InfoPostEntity } from '../entities/infopost.entity';
// import { UserEntity } from '../entities/user.entity'

export class InfoPostMapper {
  public static toEntity = (request: CreateInfoPostDto | UpdateInfoPostDto) => {
    const entity = new InfoPostEntity();

    if (request instanceof UpdateInfoPostDto) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
      entity.deletedAt = request.deletedAt;
    }
    // const item = new Item();
    // item.id = request.itemId;

    // const author = new User();
    // author.id = request.authorId;

    // const topics = request.topics.map((topic) => {
    //   const infoPostToTopic = new InfoPostToTopic();
    //   infoPostToTopic.topicId = topic.topicId;
    //   return infoPostToTopic;
    // });

    // entity.author = author;
    // entity.item = item;
    // entity.topics = topics;
    entity.createdAt = request.createdAt;

    return entity;
  };

  public static toResponse = (entity: InfoPostEntity) => {
    const response = new ResponseInfoPostDto();
    response.id = entity.id;
    // response.author = entity.author;
    // response.item = entity.item;
    response.votes = entity.votes;
    response.topics = entity.topics;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.isDeleted = entity.isDeleted;
    response.deletedAt = entity.deletedAt;

    return response;
  };

  public static toResponseList = (entities: InfoPostEntity[]) => {
    return entities.map((entity) => this.toResponse(entity));
  };
}
