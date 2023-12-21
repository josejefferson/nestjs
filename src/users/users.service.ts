import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { createPaginator } from 'prisma-pagination'
import { PaginatedOutputDto } from '../config/pagination/dto/paginated-output.dto'
import { PrismaService } from '../config/prisma/prisma.service'

@Injectable()
export class UsersService {
  model = this.prisma.user

  constructor(private prisma: PrismaService) {}

  findAllPaginated(
    page: number,
    perPage: number,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput
  ): Promise<PaginatedOutputDto<User>> {
    const paginate = createPaginator({ perPage })
    return paginate(this.model, { where, orderBy }, { page })
  }

  findAll(where?: Prisma.UserWhereInput): Promise<User[]> {
    return this.model.findMany({
      where
    })
  }

  findById(id: User['id']): Promise<User | null> {
    return this.model.findUnique({
      where: { id }
    })
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.model.findUnique({
      where
    })
  }

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.model.create({
      data
    })
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User> {
    return this.model.update({
      data,
      where
    })
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.model.delete({
      where
    })
  }

  count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.model.count({
      where
    })
  }

  findOneByUsername(username: string) {
    return this.findOne({ username })
  }
}
