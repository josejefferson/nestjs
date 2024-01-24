import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@dataui/crud-typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {
  constructor(@InjectRepository(Product) public repository: Repository<Product>) {
    super(repository)
  }
}
