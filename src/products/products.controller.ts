import { Crud, CrudController } from '@dataui/crud'
import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

// @UseGuards(AuthGuard)
@Crud({
  model: { type: Product },
  dto: { create: CreateProductDto, update: UpdateProductDto },
  query: {
    join: {
      category: { eager: true }
    }
  }
})
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('products')
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
