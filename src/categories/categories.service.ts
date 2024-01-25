import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@dataui/crud-typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(Category) public repository: Repository<Category>) {
    super(repository)
  }
}
