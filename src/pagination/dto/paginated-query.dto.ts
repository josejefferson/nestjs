import { ApiProperty } from '@nestjs/swagger'

export class PageDto {
  @ApiProperty({ default: 1, required: false, minimum: 1 })
  page: Number
}

export class PerPageDto {
  @ApiProperty({ default: 10, required: false, minimum: 1 })
  perPage: Number
}
