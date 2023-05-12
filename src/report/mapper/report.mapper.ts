import { CreateReportRequest } from '../dto/request/create-report.dto';
import { UpdateReportRequest } from '../dto/request/update-report.dto';
import { ReportEntity } from '../entities/report.entity';
import { ReportResponse } from '../dto/response/report.response.dto';
import { UserMapper } from '../../user/mapper/user.mapper';

export class ReportMapper {
  public static toEntity(request: CreateReportRequest, userId: number) {
    const entity = new ReportEntity();

    entity.authorId = userId;
    entity.postId = request.postId;
    entity.comment = request.comment;
    entity.reportReason = request.reportReason;
    entity.createdAt = request.createdAt;
    entity.status = request.status;
    return entity;
  }

  public static toAdminEntity(request: UpdateReportRequest, adminId: number) {
    const entity = new ReportEntity();
    entity.id = request.id;
    entity.reportReason = request.reportReason;
    entity.status = request.status;
    entity.comment = request.comment;
    entity.reportResult = request.reportResult;
    entity.resolvedById = adminId;
    entity.resolvedAt = request.resolvedAt;
    return entity;
  }

  public static toResponse(entity: ReportEntity) {
    const response = new ReportResponse();
    response.id = entity.id;
    response.author = UserMapper.toUserInfoResponse(entity.author);
    response.post = entity.post;
    response.reportReason = entity.reportReason;
    response.comment = entity.comment;
    response.status = entity.status;
    response.createdAt = entity.createdAt;
    response.resolvedAt = entity.resolvedAt;
    return response;
  }
  public static toResponseList(entities: ReportEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
