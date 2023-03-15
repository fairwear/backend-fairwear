import { CreateTopicDto } from "../dto/request/create-topic.dto";
import { UpdateTopicDto } from "../dto/request/update-topic.dto";
import { TopicResponse } from "../dto/response/response-topic.dto";
import { TopicEntity } from "../entities/topic.entity";


export class TopicMapper {
    public static toEntity(
        request: CreateTopicDto | UpdateTopicDto,
      ) {
        const entity = new TopicEntity();
    
        if (request instanceof UpdateTopicDto) {
          entity.id = request.id;
        }
        entity.name = request.name;
        // entity.itemIds = request.brandIds;
        //entity.subtopicIds = request.subtopicIds;
        // entity.userIds = request.userIds;
    
        return entity;
      }

        public static toResponse(entity: TopicEntity) {
            const response = new TopicResponse();
            response.id = entity.id;
            response.name = entity.name;
            // response.itemIds = entity.brandId;
            //response.subtopicIds = entity.subtopicIds;
            // response.userIds = entity.userIds;
            
            return response;
          }

        public static toResponseList(entities: TopicEntity[]) {
            return entities.map((entity) => this.toResponse(entity));
          }
}