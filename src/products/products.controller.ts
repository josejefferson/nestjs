import { Crud, CrudController } from '@dataui/crud'
import { Controller, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'

@Crud({
  model: { type: Product },
  dto: { create: CreateProductDto, update: UpdateProductDto },
  query: {
    join: {
      category: { eager: true }
    }
  }
})
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('products')
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
