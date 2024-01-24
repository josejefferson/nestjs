import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'
import {
  ApiOkPaginatedResponse,
  ApiPaginationQuery,
  Paginate,
  PaginateQuery
} from 'nestjs-paginate'
// import { AuthUser } from 'src/auth/auth-user.decorator'
import { AuthGuard } from 'src/auth/auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'

// @UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiOkPaginatedResponse(User, {
    sortableColumns: ['id', 'username', 'idade']
  })
  @ApiPaginationQuery({
    sortableColumns: ['id', 'username', 'idade']
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.service.findAllPaginated(query)
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  findOne(@Param('id') id: number) {
    return this.service.findOne({ id })
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() data: CreateUserDto /*, @AuthUser() authUser: User*/) {
    return this.service.create(data /*, authUser*/)
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  update(@Param('id') id: number, @Body() data: UpdateUserDto /*, @AuthUser() authUser: User*/) {
    return this.service.update({ id }, data /*, authUser*/)
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  remove(@Param('id') id: number) {
    return this.service.remove({ id })
  }
}
