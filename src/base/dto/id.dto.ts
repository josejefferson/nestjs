import { ApiProperty } from '@nestjs/swagger'
import { IsInt } from 'class-validator'

export class ID {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number
}
