import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ApiPaginatedResponse } from '../config/pagination/decorators/api-paginated-response.decorator'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard'

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  findAll(@Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
    return this.usersService.findAll({ page, perPage })
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id })
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ where: { id: +id }, data: updateUserDto })
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserDto })
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id })
  }
}
