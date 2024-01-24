import { PaginateQuery, Paginated } from 'nestjs-paginate'
import { DeleteResult, FindManyOptions, FindOptionsWhere } from 'typeorm'
import { BaseEntity } from './entities/base.entity'

export interface IBaseService<T extends BaseEntity> {
  findAllPaginated(query: PaginateQuery): Promise<Paginated<T>>
  findAll(options?: FindManyOptions<T>): Promise<T[]>
  findOne(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null>
  create(data: any): Promise<T>
  update(where: FindOptionsWhere<T>, data: any): Promise<T>
  remove(where: FindOptionsWhere<T>): Promise<DeleteResult>
  count(where?: FindManyOptions<T>): Promise<number>
}
