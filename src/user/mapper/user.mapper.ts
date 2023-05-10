import { UserRoleToUserEntity } from '../../user-role/entity/user-role-to-user.entity';
import { CreateUserRequest } from '../dto/request/create-user.dto';
import { UpdateUserRequest } from '../dto/request/update-user.dto';
import UserInfoResponse from '../dto/response/user-info.response.dto';
import { UserResponse } from '../dto/response/user.response.dto';
import { UserEntity } from '../entities/user.entity';
export class UserMapper {
  public static toEntity(request: CreateUserRequest | UpdateUserRequest) {
    const entity = new UserEntity();

    if (request instanceof UpdateUserRequest) {
      entity.id = request.id;
      entity.updatedAt = request.updatedAt;
      entity.refreshToken = request.refreshToken;
    }
    entity.username = request.username;
    entity.password = request.password;
    entity.email = request.email;
    entity.name = request.name;
    entity.surname = request.surname;
    entity.roles = request.roleIds.map((roleId) => {
      const userRole = new UserRoleToUserEntity();
      userRole.roleId = roleId;
      return userRole;
    });
    if (request instanceof CreateUserRequest) {
      entity.createdAt = request.createdAt;
    }

    return entity;
  }
  public static toResponse(entity: UserEntity) {
    const response = new UserResponse();
    response.id = entity.id;
    response.username = entity.username;
    response.password = entity.password;
    response.email = entity.email;
    response.name = entity.name;
    response.surname = entity.surname;
    response.roles = entity.roles;
    response.refreshToken = entity.refreshToken;
    response.userTrustScore = entity.userTrustScore;
    response.createdAt = entity.createdAt;
    response.updatedAt = entity.updatedAt;
    response.deletedAt = entity.deletedAt;

    return response;
  }

  public static toUserInfoResponse(entity: UserEntity) {
    const userInfoResponse = new UserInfoResponse();
    userInfoResponse.name = entity.name;
    userInfoResponse.surname = entity.surname;
    userInfoResponse.username = entity.username;
    userInfoResponse.email = entity.email;
    userInfoResponse.userTrustScore = entity.userTrustScore;

    return userInfoResponse;
  }

  public static toResponseList(entities: UserEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
