import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNumber, IsString, IsUrl, Min } from 'class-validator'
import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../base/entities/base.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity()
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Apple' })
  @Column()
  @IsString()
  name: string

  @ApiProperty({ example: 'Apple is a fruit' })
  @Column()
  @IsString()
  description: string

  @ApiProperty({ example: 7.99 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number

  @ApiProperty({ example: 5 })
  @Column({ type: 'int' })
  @IsInt()
  @Min(-1)
  stock: number

  @ApiProperty({ example: 'https://dummyimage.com/600x400/000/fff' })
  @Column()
  @IsUrl()
  image: string

  @ManyToOne(() => Category, (category) => category.products)
  category: Category
}
