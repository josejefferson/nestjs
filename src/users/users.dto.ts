import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { User } from './users.entity'

export class CreateUserDto extends OmitType(User, ['id', 'password']) {
  @ApiProperty({ example: 'P@ssw0rd' })
  @IsString()
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
