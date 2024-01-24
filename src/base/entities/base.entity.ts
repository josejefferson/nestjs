import { ApiProperty } from '@nestjs/swagger'
import { PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1 })
  id: number
}
