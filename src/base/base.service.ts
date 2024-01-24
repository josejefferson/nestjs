import { NotFoundException } from '@nestjs/common'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'
import { IBaseService } from './IBase.service'
import { BaseEntity } from './entities/base.entity'

// @Component()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async findAllPaginated(query: PaginateQuery): Promise<Paginated<T>> {
    return paginate(query, this.genericRepository, {
      // sortableColumns: []
      sortableColumns: []
      // nullSort: 'last',
      // defaultSortBy: [['id', 'DESC']],
      // searchableColumns: ['username', 'idade'],
      // select: [''],
      // filterableColumns: {
      //   name: [FilterOperator.EQ, FilterSuffix.NOT],
      //   age: true
      // }
    })
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.genericRepository.find(options)
  }

  async findOne(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    throwError = true
  ): Promise<T | null> {
    const result = await this.genericRepository.findOneBy(options)
    if (throwError && !result) throw new NotFoundException('Entity not found')
    return result
  }

  async create(data: T /*, authUser: UserDto*/): Promise<T> {
    // const entity = Object.assign(new Entity(), data)
    return this.genericRepository.save(data)
  }

  async update(where: FindOptionsWhere<T>, data: any): Promise<T> {
    // const entity = Object.assign(new Entity(), data)
    await this.genericRepository.update(where, data)
    return data
  }

  async remove(where: FindOptionsWhere<T>): Promise<DeleteResult> {
    return this.genericRepository.delete(where)
  }

  async count(where?: FindManyOptions<T>): Promise<number> {
    return this.genericRepository.count(where)
  }
}
