import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
// import { User } from './entities/user.entity'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { createPaginator } from 'prisma-pagination'
import { PaginatedOutputDto } from '../pagination/dto/paginated-output.dto'

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
    const { page, perPage, cursor, where, orderBy } = params
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

  // findOneByUsername(username: string) {
  //   return this.userRepository
  //     .createQueryBuilder('user')
  //     .where({ username })
  //     .addSelect('user.password')
  //     .getOne()
  // }

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
