import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsString()
  username: string

  @ApiProperty({ example: 29 })
  @IsInt()
  idade: number

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  password: string
}
