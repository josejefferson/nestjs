import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'user@email.com' })
  username: string

  @ApiProperty({ example: 29 })
  idade: number

  @ApiProperty({ example: '$2b$12$SQFWKFRiYP6JdcyUX30iSOTMh.FAlKU0Mpt16x1cwVR392Z/MaMIK' })
  password: string
}
