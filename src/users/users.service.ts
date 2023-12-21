import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { createPaginator } from 'prisma-pagination'
import { PaginatedOutputDto } from '../config/pagination/dto/paginated-output.dto'
import { PrismaService } from '../config/prisma/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UsersService {
  model = this.prisma.user

  constructor(private prisma: PrismaService) {}

  async findAllPaginated(
    page: number,
    perPage: number,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput
  ): Promise<PaginatedOutputDto<User>> {
    const paginate = createPaginator({ perPage })
    return paginate(this.model, { where, orderBy }, { page })
  }

  async findAll(where?: Prisma.UserWhereInput): Promise<User[]> {
    const result = await this.model.findMany({ where })
    return result
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const result = await this.model.findUnique({ where })
    if (!result) throw new NotFoundException('User not found')
    return result
  }

  async create(data: Prisma.UserCreateInput, authUser: UserDto): Promise<User> {
    const result = await this.model.create({ data })
    return result
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    authUser: UserDto
  ): Promise<User> {
    const result = await this.model.update({ data, where })
    if (!result) throw new NotFoundException('User not found')
    return result
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    const result = await this.model.delete({ where })
    return result
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    const result = await this.model.count({ where })
    return result
  }

  async findOneByUsername(username: string) {
    const result = await this.findOne({ username })
    return result
  }
}
