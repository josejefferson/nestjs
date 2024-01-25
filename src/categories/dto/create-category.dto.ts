import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { ID } from 'src/base/dto/id.dto'
import { Category } from '../entities/category.entity'

export class CreateCategoryDto extends OmitType(Category, ['id', 'products']) {
  @ApiProperty({ type: [ID] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ID)
  products: ID[]
}
