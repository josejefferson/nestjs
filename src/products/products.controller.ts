import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

// @UseGuards(AuthGuard)
@Crud({ model: { type: Product } })
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('products')
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
