import { Injectable } from '@nestjs/common'
// import { User } from './entities/user.entity'
import { Prisma, User } from '@prisma/client'
import { createPaginator } from 'prisma-pagination'
import { PaginatedOutputDto } from '../config/pagination/dto/paginated-output.dto'
import { PrismaService } from '../config/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(params: {
    page?: number
    perPage?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<PaginatedOutputDto<User>> {
    const { page, perPage, where, orderBy } = params
    const paginate = createPaginator({ perPage })
    return paginate(this.prisma.user, { where, orderBy }, { page })
  }

  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    })
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  findOneByUsername(username: string) {
    return this.findOne({ username })
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where
    })
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where
    })
  }
}
