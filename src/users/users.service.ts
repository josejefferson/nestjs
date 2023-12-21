import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { createPaginator } from 'prisma-pagination'
import { PaginatedOutputDto } from '../config/pagination/dto/paginated-output.dto'
import { PrismaService } from '../config/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAllPaginated(
    page: number,
    perPage: number,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput
  ): Promise<PaginatedOutputDto<User>> {
    const paginate = createPaginator({ perPage })
    return paginate(this.prisma.user, { where, orderBy }, { page })
  }

  findAll(where?: Prisma.UserWhereInput): Promise<User[]> {
    return this.prisma.user.findMany({
      where
    })
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where
    })
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
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

  count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({
      where
    })
  }

  findOneByUsername(username: string) {
    return this.findOne({ username })
  }
}
