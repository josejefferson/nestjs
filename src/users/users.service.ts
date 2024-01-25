import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@dataui/crud-typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) public repository: Repository<User>) {
    super(repository)
  }

  async findOneByUsername(username: string) {
    const result = await this.findOne({ where: { username }, relations: ['cart'] })
    return result
  }
}
