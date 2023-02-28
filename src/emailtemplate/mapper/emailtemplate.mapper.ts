import { CreateEmailTemplate } from '../dto/request/create-emailtemplate.dto';
import { UpdateEmailTemplate } from '../dto/request/update-emailtemplate.dto';
import { EmailTemplateResponse } from '../dto/response/emailtemplate.response.dto';
import { EmailTemplateEntity } from '../entities/emailtemplate.entity';

export class EmailTemplateMapper {
  public static toEntity(request: CreateEmailTemplate | UpdateEmailTemplate) {
    const entity = new EmailTemplateEntity();

    if (request instanceof UpdateEmailTemplate) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
      entity.deletedAt = request.deletedAt;
    }
    entity.name = request.name;
    entity.subject = request.subject;
    entity.body = request.body;
    entity.createdAt = request.createdAt;

    return entity;
  }

  public static toResponse(entity: EmailTemplateEntity) {
    const response = new EmailTemplateResponse();
    response.id = entity.id;
    response.name = entity.name;
    response.subject = entity.subject;
    response.body = entity.body;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    return response;
  }

  public static toResponseList(entities: EmailTemplateEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
