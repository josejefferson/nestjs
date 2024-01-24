import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiNotFoundResponse } from '@nestjs/swagger'
import { Paginate, PaginateQuery } from 'nestjs-paginate'
import { IBaseService } from './IBase.service'
import { BaseEntity } from './entities/base.entity'

export class BaseController<T extends BaseEntity> {
  constructor(private readonly IBaseService: IBaseService<T>) {}

  @Get()
  // @ApiOkPaginatedResponse(Entity, {
  //   sortableColumns: ['id', 'username', 'idade']
  // })
  // @ApiPaginationQuery({
  //   sortableColumns: ['id', 'username', 'idade']
  // })
  findAll(@Paginate() query: PaginateQuery) {
    return this.IBaseService.findAllPaginated(query)
  }

  @Get(':id')
  // @ApiOkResponse({ type: Entity })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    // @ts-expect-error aaaaaaaaaaaaaa
    return this.IBaseService.findOne({ id })
  }

  @Post()
  // @ApiCreatedResponse({ type: Entity })
  create(@Body() data: T /*, @AuthUser() authUser: Entity*/) {
    return this.IBaseService.create(data /*, authUser*/)
  }

  @Patch(':id')
  // @ApiOkResponse({ type: Entity })
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() data: T /*, @AuthUser() authUser: Entity*/) {
    // @ts-expect-error aaaaaaaaaaaaaa
    return this.IBaseService.update({ id }, data /*, authUser*/)
  }

  @Delete(':id')
  // @ApiOkResponse({ type: Entity })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    // @ts-expect-error aaaaaaaaaaaaaa
    return this.IBaseService.remove({ id })
  }
}
