import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from './users.dto'
import { User } from './users.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAllPaginated(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      // sortableColumns: []
      sortableColumns: ['id', 'username', 'idade']
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

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options)
  }

  async findOne(
    options: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    throwError = true
  ): Promise<User | null> {
    const result = await this.userRepository.findOneBy(options)
    if (throwError && !result) throw new NotFoundException('User not found')
    return result
  }

  async create(data: CreateUserDto /*, authUser: UserDto*/): Promise<User> {
    const entity = Object.assign(new User(), data)
    return this.userRepository.save(entity)
  }

  async update(where: FindOptionsWhere<User>, data: UpdateUserDto): Promise<User> {
    const entity = Object.assign(new User(), data)
    await this.userRepository.update(where, entity)
    return entity
  }

  async remove(where: FindOptionsWhere<User>) {
    return this.userRepository.delete(where)
  }

  async count(where?: FindManyOptions<User>): Promise<number> {
    return this.userRepository.count(where)
  }

  async findOneByUsername(username: string) {
    const result = await this.findOne({ username }, false)
    return result
  }
}
