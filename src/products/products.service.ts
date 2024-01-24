import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BaseService } from 'src/base/base.service'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {
    super(productsRepository)
  }
}
