import { RoleToUser } from '@prisma/client';
import { CreateUserRequest } from '../dto/request/create-user.dto';
import { UpdateUserRequest } from '../dto/request/update-user.dto';
import { UserResponse } from '../dto/response/user.response.dto';
import { UserEntity } from '../entities/user.entity';
export class UserMapper {
  public static toEntity(
    request: CreateUserRequest | UpdateUserRequest,
    roles?: RoleToUser,
  ) {
    const entity = new UserEntity();

    if (request instanceof UpdateUserRequest) {
      entity.id = request.id;
    }
    entity.username = request.username;
    entity.password = request.password;
    entity.email = request.email;
    entity.name = request.name;
    entity.surname = request.surname;
    entity.roles = entity.roles || [];
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
    return response;
  }

  public static toResponseList(entities: UserEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }
}
