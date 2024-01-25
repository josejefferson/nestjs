import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { Product } from 'src/products/entities/product.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseEntity } from '../../base/entities/base.entity'

@Entity()
export class Category extends BaseEntity {
  @ApiProperty({ example: 'Fruits' })
  @Column()
  @IsString()
  name: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
