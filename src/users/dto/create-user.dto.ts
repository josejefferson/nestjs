import { ApiProperty, OmitType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'
import { ID } from 'src/base/dto/id.dto'
import { User } from '../entities/user.entity'

export class CreateUserDto extends OmitType(User, ['id', 'password', 'cart']) {
  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  password: string

  @ApiProperty({ type: [ID] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ID)
  cart: ID[]
}
