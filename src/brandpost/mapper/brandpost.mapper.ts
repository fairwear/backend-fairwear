import { BrandPostEntity } from '../entities/brandpost.entity';

export class BrandPostMapper {
  public static toEntity() {
    const entity = new BrandPostEntity();
    return entity;
  }
}
