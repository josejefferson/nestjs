import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt } from 'class-validator'

export class SignInDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsString()
  username: string

  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  password: string
}
