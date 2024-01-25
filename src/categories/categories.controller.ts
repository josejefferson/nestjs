import { Crud, CrudController } from '@dataui/crud'
import { Controller, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Crud({
  model: { type: Category },
  dto: { create: CreateCategoryDto, update: UpdateCategoryDto },
  query: {
    join: {
      products: { eager: true }
    }
  }
})
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}
