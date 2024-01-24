import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { BaseController } from 'src/base/base.controller'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

// @UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('products')
@Controller('products')
export class ProductsController extends BaseController<Product> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService)
  }
}
