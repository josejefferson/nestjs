import { Crud, CrudController } from '@dataui/crud'
import { Controller } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import { CategoriesService } from './categories.service'

// @UseGuards(AuthGuard)
@Crud({
  model: { type: Category },
  dto: { create: CreateCategoryDto, update: UpdateCategoryDto },
  query: {
    join: {
      products: { eager: true }
    }
  }
})
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}
