import { CreateReportRequest } from '../dto/request/create-report.dto';
import { UpdateReportRequest } from '../dto/request/update-report.dto';
import { ReportEntity } from '../entities/report.entity';
import { ReportResponse } from '../dto/response/report.response.dto';

export class ReportMapper {
  public static toEntity(request: CreateReportRequest | UpdateReportRequest) {
    const entity = new ReportEntity();

    if (request instanceof UpdateReportRequest) {
      entity.id = request.id;
    }
    entity.authorId = request.authorId;
    entity.reportReason = request.reportReason;
    entity.itemId = request.itemId;
    entity.createdAt = request.createdAt;

    return entity;
  }

  public static toResponse(entity: ReportEntity) {
    const response = new ReportResponse();
    response.id = entity.id;
    response.authorId = entity.authorId;
    response.reportReason = entity.reportReason;
    response.itemId = entity.itemId;
    response.createdAt = entity.createdAt;
    response.comment = entity.comment;

    return response;
  }
  public static toResponseList(entities: ReportEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
