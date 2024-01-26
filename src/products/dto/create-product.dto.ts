import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsObject, IsOptional, ValidateNested } from 'class-validator'
import { ID } from '../../base/dto/id.dto'
import { Product } from '../entities/product.entity'

export class CreateProductDto extends OmitType(Product, ['id', 'category']) {
  @ApiProperty({ type: ID })
  @IsObject()
  @ValidateNested()
  @Type(() => ID)
  @IsOptional()
  category: ID | null = null
}
