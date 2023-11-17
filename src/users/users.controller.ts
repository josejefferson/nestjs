import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { ApiPaginatedResponse } from '../pagination/decorators/api-paginated-response.decorator'
import { PageDto, PerPageDto } from '../pagination/dto/paginated-query.dto'

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiPaginatedResponse(CreateUserDto /* temp */)
  @ApiQuery({ name: 'page', type: PageDto })
  @ApiQuery({ name: 'perPage', type: PerPageDto })
  findAll(@Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.usersService.findAll({ page, perPage })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ where: { id: +id }, data: updateUserDto })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id })
  }
}
