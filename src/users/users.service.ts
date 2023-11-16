import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const entity = Object.assign(new User(), createUserDto)
    return this.userRepository.save(entity)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  findOneByUsername(username: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const entity = Object.assign(new User(), updateUserDto)
    return this.userRepository.update(id, entity)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }
}
